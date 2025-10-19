import { CompletionItem, CompletionItemKind, Position, Range, TextEdit, workspace } from "vscode";
class CompletionItemCache {
    constructor() {
        this.cache = [];
        this.lastLine = -1;
        this.lastDocPath = '';
    }
    reset() {
        this.cache = [];
        this.lastLine = -1;
        this.lastDocPath = '';
    }
    update(document, position, completions) {
        this.lastLine = position.line;
        this.lastDocPath = workspace.asRelativePath(document.uri, false).toLowerCase();
        this.cache = completions;
    }
    get(document, position) {
        const currentDocPath = workspace.asRelativePath(document.uri, false).toLowerCase();
        if (this.lastLine === position.line && this.lastDocPath === currentDocPath) {
            return this.cache;
        }
        return undefined;
    }
}
export const labelRegex = /^(?:\s)*([^\d\s\$]+[\dA-Za-z_\?\$]*):/gm;
const data = new Map();
const completionCache = new CompletionItemCache();
const currentPcCompletions = new CompletionItem("$", CompletionItemKind.Snippet);
currentPcCompletions.detail = "(current program counter)";
currentPcCompletions.insertText = "$";
let inProcess = false;
let debounceTimer;
/**
 * Search for labels in the specified file and update the labelData map.
 *
* @param folder - a folder path string or vscode.Uri pointing to the folder to search
* @return Promise resolving to void
 */
export async function indexFileLabels(fileUri, document) {
    const fileUriString = workspace.asRelativePath(fileUri, false).toLowerCase();
    try {
        const doc = document ?? await workspace.openTextDocument(fileUri);
        const text = doc.getText();
        const labels = [...text.matchAll(labelRegex)].map(m => {
            const fullMatch = m[0];
            const labelValue = m[1];
            const labelPosition = doc.positionAt(m.index + fullMatch.indexOf(labelValue));
            return {
                value: labelValue,
                uri: fileUri,
                position: labelPosition,
                range: new Range(labelPosition, labelPosition.translate(0, labelValue.length))
            };
        });
        if (labels.length > 0) {
            data.set(fileUriString, labels);
            return;
        }
    }
    catch { }
    finally {
        completionCache.reset();
    }
    data.delete(fileUriString);
}
/**
 * Search for labels in all .asm/.s/.as files under the provided folder and return
 *
 * @param options - optional settings: { exclude?: string | TextDocument[] } where exclude accepts one or more glob patterns relative to workspace (e.g. ["**\/node_modules/**","**\/build/**"]) and maxFiles?: number to limit results
 * @return Promise resolving to void
 */
export async function indexWorkspaceLabels(dataPairs) {
    if (inProcess)
        return;
    inProcess = true;
    try {
        data.clear();
        await Promise.all(dataPairs.map(([uri, doc]) => indexFileLabels(uri, doc)));
    }
    finally {
        completionCache.reset();
        inProcess = false;
    }
}
export function removeFileLabels(fileUri) {
    const fileUriString = workspace.asRelativePath(fileUri, false).toLowerCase();
    data.delete(fileUriString);
    completionCache.reset();
}
export function scheduleIndexFileLabels(uri, document, delay = 400) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => indexFileLabels(uri, document), delay);
}
export async function scheduleIndexWorkspaceLabels(dataPairs, delay = 400) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    await new Promise(resolve => {
        debounceTimer = setTimeout(() => resolve(), delay);
    });
    await indexWorkspaceLabels(dataPairs);
}
export function getLabelCompletions(document, position) {
    const cached = completionCache.get(document, position);
    if (cached)
        return cached;
    const documentText = document.getText();
    const lowerDocumentText = documentText.toLowerCase();
    const documentPath = workspace.asRelativePath(document.uri, false).toLowerCase();
    const completions = [...data.entries()].map(([filePath, labels]) => {
        return labels.map(({ value }) => {
            const inCurrentFile = filePath === documentPath;
            const item = new CompletionItem(value, CompletionItemKind.Function);
            item.insertText = value;
            if (!inCurrentFile) {
                const extrnRegex = new RegExp(`^\\s*EXTRN\\s+${value}\\b`, 'm');
                if (extrnRegex.test(documentText)) {
                    item.detail = `(imported)`;
                }
                else {
                    item.detail = `(external)`;
                    let line = 0;
                    if (lowerDocumentText.includes("extrn")) {
                        line = document.positionAt(lowerDocumentText.lastIndexOf("extrn")).line + 1;
                    }
                    else if (lowerDocumentText.includes("include")) {
                        line = document.positionAt(lowerDocumentText.lastIndexOf("include")).line + 1;
                    }
                    else if (lowerDocumentText.includes("global")) {
                        line = document.positionAt(lowerDocumentText.indexOf("global")).line;
                    }
                    else if (lowerDocumentText.includes("psect")) {
                        line = document.positionAt(lowerDocumentText.indexOf("psect")).line;
                    }
                    item.additionalTextEdits = [
                        TextEdit.insert(new Position(line, 0), `EXTRN ${value}\n`)
                    ];
                }
            }
            else {
                item.detail = "(this file)";
            }
            return item;
        });
    }).flat();
    completions.push(currentPcCompletions);
    completionCache.update(document, position, completions);
    return completions;
}
export const labelData = data;
//# sourceMappingURL=label.js.map