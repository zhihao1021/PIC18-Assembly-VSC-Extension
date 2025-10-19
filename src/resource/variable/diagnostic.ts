import { getFileId } from "@/utils/getFileId";
import { Diagnostic, DiagnosticCollection, DiagnosticSeverity, languages, Uri } from "vscode";
import { variableManager } from "./data";

const variableCollections: DiagnosticCollection = languages.createDiagnosticCollection("pic18-asm-variables");

export function updateVariableDiagnostics(): void {
    variableCollections.clear();
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

    variableManager.fileMapUsageData.forEach(variables => variables.forEach(({ uri, range, value: { name, exists } }) => {
        if (exists) return;

        pushDiagnostic(uri, new Diagnostic(
            range, `Undefined variable '${name}'`,
            DiagnosticSeverity.Error
        ));
    }));

    diagnosticsMap.forEach(({ uri, diagnostics }) => variableCollections.set(uri, diagnostics));
}
