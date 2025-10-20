import { Diagnostic, DiagnosticCollection, DiagnosticSeverity, languages, Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { labelManager } from "./data";
import { LabelResourceType } from "./types/label";

const labelCollections: DiagnosticCollection = languages.createDiagnosticCollection("pic18-asm-labels");

export function updateLabelDiagnostics(): void {
    labelCollections.clear();
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

    labelManager.labelNameMapData.forEach((labels, labelName) => {
        const definedLabel: LabelResourceType[] = [];
        labels.forEach(label => {
            if (!label.value.isExternal) {
                definedLabel.push(label);
                return;
            }

            if (label.value.exists) return;

            pushDiagnostic(
                label.uri,
                new Diagnostic(
                    label.range, `Undefined external label '${labelName}'`,
                    DiagnosticSeverity.Error
                )
            )
        });

        if (definedLabel.length > 1) {
            definedLabel.forEach(({ uri, range }) => pushDiagnostic(
                uri,
                new Diagnostic(
                    range, `Duplicate label '${labelName}'`,
                    DiagnosticSeverity.Error
                )
            ));
        }
    });

    labelManager.branchLabelFileMapData.forEach(labels => [...labels.values()].flat().forEach(({
        uri,
        range,
        value: { name, missing, macro }
    }) => {
        if (!missing && macro) {
            pushDiagnostic(uri, new Diagnostic(
                range, `The label '${name}' in macro '${macro.value.name}' parameters also defined as a branch label may cause unexpected behavior.`,
                DiagnosticSeverity.Warning
            ));
            return;
        }
        if (!missing || macro) return;

        pushDiagnostic(uri, new Diagnostic(
            range, `Unknow branch label '${name}'`,
            DiagnosticSeverity.Error
        ));
    }));

    diagnosticsMap.forEach(({ uri, diagnostics }) => labelCollections.set(uri, diagnostics));
}