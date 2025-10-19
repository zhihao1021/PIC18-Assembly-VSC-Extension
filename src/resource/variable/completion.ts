import { CompletionItem, CompletionItemKind, MarkdownString, TextDocument } from "vscode";

import { getFileId } from "@/utils/getFileId";
import { variableManager } from "./data";
import { includeManager } from "../include/data";

export function getVariableCompletions(document: TextDocument): CompletionItem[] {
    const fileUri = getFileId(document.uri);

    const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
    if (!includeFiles) return [];

    const includedVariables: CompletionItem[] = [];
    includeFiles.forEach(includeUri => {
        variableManager.fileMapDefineData.get(includeUri)?.forEach(({ position, value: { value, comment } }, name) => {
            const item = new CompletionItem(name, CompletionItemKind.Variable);

            item.insertText = name;
            item.detail = `(variable) ${value}`;
            item.documentation = new MarkdownString(`Define in \`${includeUri}:${position.line}\`\n\n${comment || ""}`);

            includedVariables.push(item);
        });
    });

    return includedVariables;
}
