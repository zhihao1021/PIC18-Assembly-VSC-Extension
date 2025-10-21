import {
    CancellationToken,
    CompletionContext,
    CompletionItem,
    ExtensionContext,
    languages,
    Position,
    TextDocument,
} from "vscode";

import { PIC_INSTRUCTIONS_COMPLETIONS } from "@/pic18/instructions";
import { isBranchAutoComplete } from "@/pic18/utils";
import { PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT } from "@/pic18/define";
import { getLabelCompletions } from "@/resource/label/completion";
import { getVariableCompletions } from "@/resource/variable/completion";
import { getMacroCompletions, getMacroParamsCompletions } from "@/resource/macro/completion";
import { getFileId } from "@/utils/getFileId";
import { macroManager } from "@/resource/macro/data";

async function provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
): Promise<CompletionItem[] | undefined> {
    const fileUri = getFileId(document.uri);
    const linePrefix = document.lineAt(position).text.slice(0, position.character);
    if (/;/.test(linePrefix)) {
        return undefined;
    }

    if (isBranchAutoComplete(linePrefix)) {
        const macro = macroManager.fileMapMacroData.get(fileUri)?.find(m => m.range.contains(position));

        return [
            ...getLabelCompletions(document),
            ...(macro ? getMacroParamsCompletions(macro) : [])
        ];
    }

    if (/^(?:\s)*([^\s\#]+)?$/.test(linePrefix)) {
        return [
            ...getMacroCompletions(document),
            ...PIC_INSTRUCTIONS_COMPLETIONS
        ];
    }

    return [
        ...getVariableCompletions(document, position),
        ...getLabelCompletions(document, false),
        ...PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT
    ];
}

export function initAutoCompletionProvider(context: ExtensionContext) {
    const {
        subscriptions
    } = context;

    const provider = languages.registerCompletionItemProvider(
        { language: "asm" },
        { provideCompletionItems },
        " ", ","
    );

    subscriptions.push(provider);
}
