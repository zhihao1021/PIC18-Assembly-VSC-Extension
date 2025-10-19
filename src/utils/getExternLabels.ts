// import { labelData } from "@/resource/label";
import { TextDocument, workspace } from "vscode";

const extrnLabelRegex = /^\s*(?:extrn|global)\s+([A-Za-z_\?][\dA-Za-z_\?\$]*)$\b/gmi;

export function getExternLabels(document: TextDocument): Set<string> {
    const documentPath = workspace.asRelativePath(document.uri, false).toLowerCase();
    const documentText = document.getText();

    return new Set<string>([
        // ...labelData.get(documentPath)?.map(l => l.value) ?? [],
        ...[...documentText.matchAll(extrnLabelRegex)].map(m => m[1])
    ]);
}
