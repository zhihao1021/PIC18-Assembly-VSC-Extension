import { Range, TextDocument } from "vscode";

import { variableManager } from "@/resource/variable/data";
import { getFileId } from "@/utils/getFileId";

export const variableRegexGenerator = (name: string, flag: string = "gm") => new RegExp(`(?:^|,|\\s+)(${name})(?:\\s+|,|$)`, flag);

export function getVariableRanges(document: TextDocument): Range[] {
    const fileUri = getFileId(document.uri);

    const usageDataRanges = Array.from(variableManager.fileMapUsageData.get(fileUri)?.values() ?? []).filter(
        l => l.value.exists
    ).map(l => l.range);

    return usageDataRanges;
}
