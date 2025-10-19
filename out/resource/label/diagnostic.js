import { Diagnostic, DiagnosticSeverity, languages } from "vscode";
import { getFileId } from "@/utils/getFileId";
import { labelManager } from "./data";
const labelCollections = languages.createDiagnosticCollection("pic18-asm-labels");
export function updateLabelDiagnostics() {
    labelCollections.clear();
    const diagnosticsMap = new Map();
    const pushDiagnostic = (uri, diagnostic) => {
        const fileUri = getFileId(uri);
        if (diagnosticsMap.has(fileUri))
            diagnosticsMap.get(fileUri).diagnostics.push(diagnostic);
        else
            diagnosticsMap.set(fileUri, {
                uri: uri,
                diagnostics: [diagnostic]
            });
    };
    labelManager.labelNameMapData.forEach((labels, labelName) => {
        const definedLabel = [];
        labels.forEach(label => {
            if (!label.value.isExternal) {
                definedLabel.push(label);
                return;
            }
            if (label.value.exists)
                return;
            pushDiagnostic(label.uri, new Diagnostic(label.range, `Undefined external label '${labelName}'`, DiagnosticSeverity.Error));
        });
        if (definedLabel.length > 1) {
            definedLabel.forEach(({ uri, range }) => pushDiagnostic(uri, new Diagnostic(range, `Duplicate label '${labelName}'`, DiagnosticSeverity.Error)));
        }
    });
    labelManager.branchLabelFileMapData.forEach(labels => labels.forEach(({ uri, range, value: { name, missing } }) => {
        if (!missing)
            return;
        pushDiagnostic(uri, new Diagnostic(range, `Unknow branch label '${name}'`, DiagnosticSeverity.Error));
    }));
    diagnosticsMap.forEach(({ uri, diagnostics }) => labelCollections.set(uri, diagnostics));
}
//# sourceMappingURL=diagnostic.js.map