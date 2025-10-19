import { CompletionItem, CompletionItemKind, Position, TextEdit } from "vscode";
import { getFileId } from "@/utils/getFileId";
import { labelManager } from "./data";
const cachedResults = [];
const lastDocumentUri = "";
const INSERT_ORDER = [
    ["extrn", 1],
    ["include", 1],
    ["global", 0],
    ["psect", 0]
];
function labelToCompletionItem(label, type) {
    const { value: { name: labelName } } = label;
    const item = new CompletionItem(labelName, CompletionItemKind.Function);
    item.insertText = labelName;
    item.documentation = label.value.comment;
    switch (type) {
        case "currentFile":
            item.detail = "(this file)";
            item.sortText = `0_${labelName}`;
            break;
        case "imported":
            item.detail = `(imported)`;
            item.sortText = `0_${labelName}`;
            break;
        case "external":
            item.detail = `(external)`;
            item.sortText = `1_${labelName}`;
            break;
    }
    return item;
}
export function getLabelCompletions(document) {
    const fileUri = getFileId(document.uri);
    if (lastDocumentUri === fileUri)
        return cachedResults;
    const currentFilesLabels = labelManager.fileMapData.get(fileUri) || [];
    const importedLabels = currentFilesLabels.filter(({ value: label }) => label.isExternal).map(({ value: label }) => label.name);
    const documentText = document.getText().toLowerCase();
    const completions = currentFilesLabels.filter(({ value: { isExternal } }) => !isExternal).map(label => labelToCompletionItem(label, "currentFile"));
    labelManager.fileMapData.forEach((resource, uri) => {
        if (uri === fileUri)
            return;
        completions.push(...resource.filter(({ value: { isExternal } }) => !isExternal).map(resource => {
            const labelName = resource.value.name;
            if (importedLabels.includes(labelName))
                return labelToCompletionItem(resource, "imported");
            const item = labelToCompletionItem(resource, "external");
            let insertLine = 0;
            for (const [directive, indexType] of INSERT_ORDER) {
                if (!documentText.includes(directive))
                    continue;
                insertLine = document.positionAt(indexType === 1
                    ? documentText.lastIndexOf(directive)
                    : documentText.indexOf(directive)).line + indexType;
                break;
            }
            item.additionalTextEdits = [TextEdit.insert(new Position(insertLine, 0), `EXTRN ${labelName}\n`)];
            return item;
        }));
    });
    return completions;
}
//# sourceMappingURL=completion.js.map