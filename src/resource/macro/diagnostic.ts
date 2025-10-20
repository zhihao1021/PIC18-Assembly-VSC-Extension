import { getFileId } from "@/utils/getFileId";
import { Diagnostic, DiagnosticCollection, DiagnosticSeverity, languages, Uri } from "vscode";
import { macroManager } from "./data";
import { includeManager } from "../include/data";
import { MacroResourceType } from "./types/macro";

const macroCollections: DiagnosticCollection = languages.createDiagnosticCollection("pic18-asm-macros");

export function updateMacroDiagnostics(): void {
    macroCollections.clear();
    const diagnosticsMap: Map<string, {
        uri: Uri;
        diagnostics: Diagnostic[]
    }> = new Map();

    const pushDiagnostic = (uri: Uri, diagnostic: Diagnostic) => {
        const fileUri = getFileId(uri);
        if (diagnosticsMap.has(fileUri)) diagnosticsMap.get(fileUri)!.diagnostics.push(diagnostic);
        else diagnosticsMap.set(fileUri, {
            uri: uri,
            diagnostics: [diagnostic]
        });
    }

    macroManager.fileMapMacroData.forEach(macros => macros.forEach(({ uri, range, value: { name, illegal, parameters } }) => {
        if (illegal) {
            pushDiagnostic(uri, new Diagnostic(
                range, `Macro '${name}' not closed properly`,
                DiagnosticSeverity.Error
            ));
        }

        parameters.forEach((values) => {
            if (values.length < 2) return;

            values.forEach(({ range, value: { name } }) => pushDiagnostic(uri, new Diagnostic(
                range, `Duplicate macro parameter name '${name}'`,
                DiagnosticSeverity.Error
            )));
        });
    }));

    macroManager.fileIncludeMapMacroData.forEach((macros) => {
        const existMacrosData = new Map<string, MacroResourceType[]>();
        macros.forEach(macro => {
            const { name } = macro.value;
            if (!existMacrosData.has(name)) existMacrosData.set(name, []);
            existMacrosData.get(name)!.push(macro);
        });

        existMacrosData.forEach((macros, name) => {
            if (macros.length < 2) return;
            macros.forEach(({ uri, range }) => pushDiagnostic(uri, new Diagnostic(
                range, `Duplicate macro name '${name}' in included files`,
                DiagnosticSeverity.Error
            )));
        });
    });

    macroManager.fileMapMacroUsageData.forEach(macroUsages => macroUsages.forEach(({ uri, value: { illegal, rawParameters } }) => {
        if (!illegal) return;

        rawParameters.forEach(({ range, value: { name, value } }) => {
            if (name === "") {
                pushDiagnostic(uri, new Diagnostic(
                    range, `Unknown macro parameter`,
                    DiagnosticSeverity.Error
                ));
            }
            if (value === "") {
                pushDiagnostic(uri, new Diagnostic(
                    range, `Macro parameter '${name}' not provided`,
                    DiagnosticSeverity.Error
                ));
            }
        });
    }));

    diagnosticsMap.forEach(({ uri, diagnostics }) => macroCollections.set(uri, diagnostics));
}
