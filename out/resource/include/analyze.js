import { Position, Range, Uri } from "vscode";
import { getFileId } from "@/utils/getFileId";
import { includeManager } from "./data";
import { IncludeData, IncludeResource } from "./types/include";
export const includeRegex = /^[ \t]*(?:#?include +["'<])(.+)(?:["'>])/gm;
export function analyzeIncludesOfDocument(document) {
    const text = document.getText();
    includeManager.setIncludeOfUri(document.uri, new IncludeResource({
        uri: document.uri,
        position: new Position(0, 0),
        range: new Range(new Position(0, 0), new Position(0, 0)),
        value: new IncludeData({
            includes: new Set([...text.matchAll(includeRegex)].map(m => {
                const includeName = m[1];
                const includeUri = Uri.joinPath(Uri.file(document.uri.fsPath).with({
                    path: Uri.file(document.uri.fsPath).path.replace(/[^\/\\]+$/, "")
                }), includeName);
                return getFileId(includeUri);
            }))
        })
    }));
}
export function analyzeIncludesOfWorkspace(documents) {
    includeManager.clear();
    documents.forEach(doc => analyzeIncludesOfDocument(doc));
    includeManager.updateReferences();
}
export function removeLabelsOfDocument(uri) {
    includeManager.removeIncludeOfUri(uri);
}
//# sourceMappingURL=analyze.js.map