import { Position, Range, TextDocument, Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { includeManager } from "./data";
import { IncludeData, IncludeResource } from "./types/include";

export const includeRegex = /^[ \t]*(?:#?include +["'<])(.+)(?:["'>])/gm;

export function analyzeIncludesOfDocument(document: TextDocument): void {
    const text = document.getText();

    includeManager.setIncludeOfUri(document.uri, new IncludeResource({
        uri: document.uri,
        position: new Position(0, 0),
        range: new Range(new Position(0, 0), new Position(0, 0)),
        value: new IncludeData({
            includes: new Set<string>([...text.matchAll(includeRegex)].map(m => {
                const includeName = m[1];
                const includeUri = Uri.joinPath(Uri.file(document.uri.fsPath).with({
                    path: Uri.file(document.uri.fsPath).path.replace(/[^\/\\]+$/, "")
                }), includeName);

                return getFileId(includeUri);
            }))
        })
    }));
    includeManager.documentCache = document;
}

export function analyzeIncludesOfWorkspace(documents: TextDocument[]): void {
    includeManager.clear();
    documents.forEach(doc => analyzeIncludesOfDocument(doc));

    includeManager.updateReferences();
}

export function removeIncludesOfDocument(uri: Uri): void {
    includeManager.removeIncludeOfUri(uri);
}
