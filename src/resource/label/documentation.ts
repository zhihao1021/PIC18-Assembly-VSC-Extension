import { MarkdownString } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { LabelResourceType } from "./types/label";

export function labelToDocumentation({ uri, position, value: { comment } }: LabelResourceType): MarkdownString {
    const fileUri = getFileId(uri);

    return new MarkdownString(
        `Define in \`${fileUri}:${position.line + 1}\`\n\n${comment || ""}`
    )
}