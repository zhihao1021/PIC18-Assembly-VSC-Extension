import { CompletionItem, CompletionItemKind, MarkdownString, TextDocument } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { macroManager } from "./data";

export function getMacroCompletions(document: TextDocument): CompletionItem[] {
    const fileUri = getFileId(document.uri);

    const results: CompletionItem[] = [];
    macroManager.fileIncludeMapMacroData.get(fileUri)?.forEach(({ position, value: { name, comment, rawParameters } }) => {
        const item = new CompletionItem(name, CompletionItemKind.Class);

        item.insertText = name;
        if (rawParameters.length > 0) {
            item.insertText += ` ${rawParameters.map(param => param.value.name).join(", ")}`;
        }
        item.detail = `(macro)`;
        item.documentation = new MarkdownString(`Define in \`${fileUri}:${position.line}\`\n\n${comment || ""}`);

        results.push(item);
    });

    return results;
}