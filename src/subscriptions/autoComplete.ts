import {
    CancellationToken,
    CompletionContext,
    CompletionItem,
    ExtensionContext,
    languages,
    Position,
    TextDocument,
    workspace,
} from "vscode";

import {
    PIC_INSTRUCTIONS_COMPLETIONS
} from "@/pic18/instructions";
import {
    isBranchAutoComplete
} from "@/pic18/utils";
// import { variableCompletionData } from "@/resource/variable";

import { PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT } from "@/pic18/define";
// import { includesData } from "@/resource/includes";
import { getLabelCompletions } from "@/resource/label/completion";
import { variableManager } from "@/resource/variable/data";
import { getFileId } from "@/utils/getFileId";
import { includeManager } from "@/resource/include/data";
import { getVariableCompletions } from "@/resource/variable/completion";

async function provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
): Promise<CompletionItem[] | undefined> {
    const filePath = getFileId(document.uri);
    const linePrefix = document.lineAt(position).text.slice(0, position.character);
    if (/;/.test(linePrefix)) {
        return undefined;
    }

    if (isBranchAutoComplete(linePrefix)) {
        return getLabelCompletions(document);
    }

    if (/^(?:\s)*([^\s\#]+)?$/.test(linePrefix)) {
        return PIC_INSTRUCTIONS_COMPLETIONS;
    }

    // const docVariables = variableCompletionData.get(filePath) ?? [];
    // const includeVariables = (includesData.get(filePath) ?? []).flatMap(uri => {
    //     const includePath = workspace.asRelativePath(uri, false).toLowerCase();
    //     return variableCompletionData.get(includePath) ?? [];
    // });
    // const docVariables = [...variableManager.fileMapData.get(filePath)?.keys() ?? []];
    // const includeVariables = Array.from(includeManager.recursiveIncludeMapData.get(filePath) ?? []).map(uri => {
    //     return [...variableManager.fileMapData.get(uri)?.keys() ?? []];
    // }).flat();

    // return [...docVariables, ...includeVariables, ...PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT];
    return [
        ...getVariableCompletions(document),
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
