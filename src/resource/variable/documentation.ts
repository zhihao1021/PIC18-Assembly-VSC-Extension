import { MarkdownString } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { VariableDefineResourceType } from "./types/variableDefine";
import { MacroResourceType } from "../macro/types/macro";

export function variableToDocumentation(
    { uri, position, value: { comment } }: VariableDefineResourceType,
    macro?: MacroResourceType
): MarkdownString {
    const fileUri = getFileId(uri);

    if (macro) {
        const { value: { name } } = macro;

        return new MarkdownString(
            `Define in macro \`${name}\` at \`${fileUri}:${position.line + 1},${position.character + 1}\``
        );
    }
    return new MarkdownString(`Define in \`${fileUri}:${position.line + 1}\`\n\n${comment || ""}`)
}