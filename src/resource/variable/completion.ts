import { CompletionItem, CompletionItemKind, MarkdownString, Position, TextDocument } from "vscode";

import { getFileId } from "@/utils/getFileId";
import { variableManager } from "./data";
import { includeManager } from "../include/data";
import { macroManager } from "../macro/data";
import { variableToDocumentation } from "./documentation";

export function getVariableCompletions(document: TextDocument, position: Position): CompletionItem[] {
    const fileUri = getFileId(document.uri);

    const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
    if (!includeFiles) return [];

    const includedVariables: CompletionItem[] = [];
    includeFiles.forEach(includeUri => {
        variableManager.fileMapDefineData.get(includeUri)?.forEach(variable => {
            const { value: { name, value } } = variable;

            const item = new CompletionItem(name, CompletionItemKind.Variable);

            item.insertText = name;
            item.detail = `(variable) ${value}`;
            item.documentation = variableToDocumentation(variable);

            includedVariables.push(item);
        });
    });

    const macros = macroManager.fileMapMacroData.get(fileUri);
    if (macros) {
        macros.forEach(macro => {
            const { range, value: { name: macroName, parameters } } = macro;
            if (!range.contains(position)) return;

            [...parameters.values()].flat().forEach(variable => {
                const { value: { name } } = variable;

                const item = new CompletionItem(name, CompletionItemKind.Variable);

                item.insertText = name;
                item.detail = `(macro parameter) of \`${macroName}\``;
                item.documentation = variableToDocumentation(variable, macro);

                includedVariables.push(item);
            });
        });
    }

    return includedVariables;
}
