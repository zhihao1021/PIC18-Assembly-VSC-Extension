import { Range, TextDocument } from "vscode";

import { macroManager } from "@/resource/macro/data";
import { getFileId } from "@/utils/getFileId";

export function getMacroRanges(document: TextDocument): Range[] {
    const fileUri = getFileId(document.uri);

    const macroRanges = macroManager.fileMapMacroUsageData.get(fileUri)?.map(
        m => new Range(m.position, m.position.translate(0, m.value.name.length))
    ) ?? [];

    return macroRanges;
}