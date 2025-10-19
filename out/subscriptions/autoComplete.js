import { languages, workspace, } from "vscode";
import { PIC_INSTRUCTIONS_COMPLETIONS } from "@/pic18/instructions";
import { isBranchAutoComplete } from "@/pic18/utils";
import { variableCompletionData } from "@/resource/variable";
import { PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT } from "@/pic18/define";
import { includesData } from "@/resource/includes";
import { getLabelCompletions } from "@/resource/label/completion";
async function provideCompletionItems(document, position, token, context) {
    const filePath = workspace.asRelativePath(document.uri, false).toLowerCase();
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
    const docVariables = variableCompletionData.get(filePath) ?? [];
    const includeVariables = (includesData.get(filePath) ?? []).flatMap(uri => {
        const includePath = workspace.asRelativePath(uri, false).toLowerCase();
        return variableCompletionData.get(includePath) ?? [];
    });
    return [...docVariables, ...includeVariables, ...PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT];
}
export function initAutoCompletionProvider(context) {
    const { subscriptions } = context;
    const provider = languages.registerCompletionItemProvider({ language: "asm" }, { provideCompletionItems }, " ", ",");
    subscriptions.push(provider);
}
//# sourceMappingURL=autoComplete.js.map