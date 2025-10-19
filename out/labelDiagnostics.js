import { Diagnostic, DiagnosticSeverity, languages, workspace } from "vscode";
import { labelData } from "@/resource/label";
const collection = languages.createDiagnosticCollection('pic18-labels');
export function updateLabelDiagnostics() {
    collection.clear();
    // gather all labels by value
    const map = new Map();
    for (const [filePath, labels] of labelData.entries()) {
        for (const l of labels) {
            const key = l.value;
            const diag = new Diagnostic(l.range, `Duplicate label '${key}'`, DiagnosticSeverity.Error);
            const arr = map.get(key) ?? [];
            arr.push({ uriPath: filePath, diag });
            map.set(key, arr);
        }
    }
    // For each label that appears more than once, add diagnostics to each file
    for (const [key, entries] of map.entries()) {
        if (entries.length <= 1)
            continue;
        const perFile = new Map();
        for (const e of entries) {
            const list = perFile.get(e.uriPath) ?? [];
            // enhance message with hint about duplicates
            e.diag.message = `Duplicate label '${key}' — multiple definitions found in workspace`;
            list.push(e.diag);
            perFile.set(e.uriPath, list);
        }
        for (const [uriPath, diags] of perFile.entries()) {
            try {
                const wsUri = workspace.workspaceFolders?.[0]?.uri;
                if (!wsUri)
                    continue;
                const full = wsUri.with({ path: wsUri.path + '/' + uriPath });
                collection.set(full, diags);
            }
            catch (err) {
                // ignore path resolution issues
            }
        }
    }
}
export function clearLabelDiagnostics() {
    collection.clear();
}
export default updateLabelDiagnostics;
//# sourceMappingURL=labelDiagnostics.js.map