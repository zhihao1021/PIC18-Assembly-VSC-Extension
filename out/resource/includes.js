import { Uri, workspace } from "vscode";
const includeRegex = /^\s*#?INCLUDE\s+["'<](.+?)["'>]/gmi;
const data = new Map();
let inProcess = false;
let debounceTimer;
export async function indexFileIncludes(document) {
    const fileUriString = workspace.asRelativePath(document.uri.fsPath, false).toLowerCase();
    try {
        const documentText = document.getText();
        const includes = [];
        await Promise.all([...documentText.matchAll(includeRegex)].map(async (m) => {
            if (m.length < 2)
                return;
            const includePath = m[1];
            // Check if the file is existent in the workspace
            const includeUri = Uri.joinPath(Uri.file(document.uri.fsPath).with({ path: Uri.file(document.uri.fsPath).path.replace(/[^\/\\]+$/, "") }), includePath);
            console.log("Parse:", workspace.asRelativePath(includeUri, false).toLowerCase());
            const files = await workspace.findFiles(workspace.asRelativePath(includeUri, false), null, 1);
            if (files.length > 0)
                includes.push(includeUri);
        }));
        if (includes.length > 0) {
            data.set(fileUriString, includes);
            return;
        }
    }
    catch { }
    data.delete(fileUriString);
}
export async function indexWorkspaceIncludes(documents) {
    if (inProcess)
        return;
    inProcess = true;
    try {
        data.clear();
        await Promise.all(documents.map(indexFileIncludes));
    }
    finally {
        inProcess = false;
    }
}
export function removeFileIncludes(fileUri) {
    const fileUriString = workspace.asRelativePath(fileUri, false).toLowerCase();
    data.delete(fileUriString);
    data.forEach((includes, uri) => {
        const filteredIncludes = includes.filter(inc => inc.fsPath !== fileUri.fsPath);
        data.set(uri, filteredIncludes);
    });
}
export async function scheduleIndexFileIncludes(document, delay = 400, callback) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    await new Promise(resolve => {
        debounceTimer = setTimeout(() => resolve(), delay);
    });
    await indexFileIncludes(document);
    callback?.();
}
export async function scheduleIndexWorkspaceIncludes(documents, delay = 400, callback) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    await new Promise(resolve => {
        debounceTimer = setTimeout(() => resolve(), delay);
    });
    await indexWorkspaceIncludes(documents);
    callback?.();
}
export const includesData = data;
//# sourceMappingURL=includes.js.map