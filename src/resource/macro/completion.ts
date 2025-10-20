import { CompletionItem, CompletionItemKind, MarkdownString, TextDocument } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { macroManager } from "./data";
import { macroToDocumentation } from "./documentation";
import { MacroResourceType } from "./types/macro";
import { variableToDocumentation } from "../variable/documentation";

export function getMacroCompletions(document: TextDocument): CompletionItem[] {
    const fileUri = getFileId(document.uri);

    const results: CompletionItem[] = [];
    macroManager.fileIncludeMapMacroData.get(fileUri)?.forEach(macro => {
        const { value: { name, rawParameters } } = macro;
        const item = new CompletionItem(name, CompletionItemKind.Class);

        item.insertText = name;
        if (rawParameters.length > 0) {
            item.insertText += ` ${rawParameters.map(param => param.value.name).join(", ")}`;
        }
        item.detail = `(macro)`;
        item.documentation = macroToDocumentation(macro);

        results.push(item);
    });

    return results;
}

export function getMacroParamsCompletions(macro: MacroResourceType): CompletionItem[] {
    const { value: { name, parameters } } = macro;
    return [...parameters.values()].flat().map(variable => {
        const { value: { name } } = variable;

        const item = new CompletionItem(name, CompletionItemKind.Variable);

        item.insertText = name;
        item.detail = `(macro parameter) of \`${name}\``;
        item.documentation = variableToDocumentation(variable, macro);

        return item;
    });
}
