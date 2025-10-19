// import { labelData } from "@/resource/label";
import { workspace } from "vscode";
const extrnLabelRegex = /^\s*(?:extrn|global)\s+([A-Za-z_\?][\dA-Za-z_\?\$]*)$\b/gmi;
export function getExternLabels(document) {
    const documentPath = workspace.asRelativePath(document.uri, false).toLowerCase();
    const documentText = document.getText();
    return new Set([
        // ...labelData.get(documentPath)?.map(l => l.value) ?? [],
        ...[...documentText.matchAll(extrnLabelRegex)].map(m => m[1])
    ]);
}
//# sourceMappingURL=getExternLabels.js.map