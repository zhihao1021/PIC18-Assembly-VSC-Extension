import { CompletionItem, CompletionItemKind, MarkdownString, Position, TextDocument } from "vscode";

import { getFileId } from "@/utils/getFileId";
import { variableManager } from "./data";
import { includeManager } from "../include/data";
import { macroManager } from "../macro/data";

export function getVariableCompletions(document: TextDocument, position: Position): CompletionItem[] {
    const fileUri = getFileId(document.uri);

    const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
    if (!includeFiles) return [];

    const includedVariables: CompletionItem[] = [];
    includeFiles.forEach(includeUri => {
        variableManager.fileMapDefineData.get(includeUri)?.forEach(({ position, value: { value, comment, name } }) => {
            const item = new CompletionItem(name, CompletionItemKind.Variable);

            item.insertText = name;
            item.detail = `(variable) ${value}`;
            item.documentation = new MarkdownString(`Define in \`${includeUri}:${position.line}\`\n\n${comment || ""}`);

            includedVariables.push(item);
        });
    });

    const macros = macroManager.fileMapMacroData.get(fileUri);
    if (macros) {
        macros.forEach(({ range, value: { name: macroName, parameters } }) => {
            if (!range.contains(position)) return;

            [...parameters.values()].flat().forEach(({
                position, value: { name }
            }) => {
                const item = new CompletionItem(name, CompletionItemKind.Variable);

                item.insertText = name;
                item.detail = `(macro parameter) of \`${macroName}\``;
                item.documentation = new MarkdownString(`Define in macro \`${macroName}\` at \`${fileUri}:${position.line},${position.character}\``);

                includedVariables.push(item);
            });
        });
    }

    return includedVariables;
}
