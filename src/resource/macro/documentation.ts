import { MarkdownString } from "vscode";
import { MacroResourceType } from "./types/macro";
import { getFileId } from "@/utils/getFileId";

export function macroToDocumentation(
    { uri, position, value: { comment } }: MacroResourceType
): MarkdownString {
    const fileUri = getFileId(uri);

    return new MarkdownString(`Define in \`${fileUri}:${position.line + 1}\`\n\n${comment || ""}`);
}
