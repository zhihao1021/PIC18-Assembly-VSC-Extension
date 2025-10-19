import { CompletionItem, CompletionItemKind, Range, workspace } from "vscode";
export const variableRegex = /^(?:\s)*([^0-9\s]+\S*)\s+EQU\s+(\S+)/gm;
const data = new Map();
const completionData = new Map();
let inProcess = false;
let debounceTimer;
export async function indexFileVariables(document) {
    const fileUriString = workspace.asRelativePath(document.uri.fsPath, false).toLowerCase();
    try {
        const text = document.getText();
        const variables = [...text.matchAll(variableRegex)].map(m => {
            if (m.length < 3)
                return;
            const variableName = m[1];
            const variableValue = m[2];
            const varPosition = document.positionAt(m.index + m[0].indexOf(variableName));
            return {
                value: { name: variableName, value: variableValue },
                uri: document.uri,
                position: varPosition,
                range: new Range(varPosition, varPosition.translate(0, variableName.length))
            };
        }).filter(v => v !== undefined);
        if (variables.length > 0) {
            data.set(fileUriString, variables);
            completionData.set(fileUriString, variables.map(({ value: { name, value } }) => {
                const item = new CompletionItem(name, CompletionItemKind.Variable);
                item.insertText = name;
                item.detail = `(variable) ${value}`;
                return item;
            }));
            return;
        }
    }
    catch { }
    data.delete(fileUriString);
    completionData.delete(fileUriString);
}
export async function indexWorkspaceVariables(documents) {
    if (inProcess)
        return;
    inProcess = true;
    try {
        data.clear();
        completionData.clear();
        await Promise.all(documents.map(indexFileVariables));
    }
    finally {
        inProcess = false;
    }
}
export function removeFileVariables(fileUri) {
    const fileUriString = workspace.asRelativePath(fileUri, false).toLowerCase();
    data.delete(fileUriString);
    completionData.delete(fileUriString);
}
export async function scheduleIndexFileVariables(document, delay = 400, callback) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    await new Promise(resolve => {
        debounceTimer = setTimeout(() => resolve(), delay);
    });
    await indexFileVariables(document);
    callback?.();
}
export async function scheduleIndexWorkspaceVariables(documents, delay = 400, callback) {
    if (debounceTimer)
        clearTimeout(debounceTimer);
    await new Promise(resolve => {
        debounceTimer = setTimeout(() => resolve(), delay);
    });
    await indexWorkspaceVariables(documents);
    callback?.();
}
export const variableData = data;
export const variableCompletionData = completionData;
//# sourceMappingURL=variable.js.map