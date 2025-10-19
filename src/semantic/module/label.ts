import { Range, TextDocument } from "vscode";

import { labelManager } from "@/resource/label/data";
import { getFileId } from "@/utils/getFileId";

export function getLabelRanges(document: TextDocument): Range[] {
    const fileUri = getFileId(document.uri);

    const branchLabelRanges = labelManager.branchLabelFileMapData.get(fileUri)?.filter(
        l => !l.value.missing
    ).map(l => l.range) ?? [];
    const externalLabelRanges = labelManager.fileMapData.get(fileUri)?.filter(
        l => l.value.isExternal && l.value.exists
    ).map(l => l.range) ?? [];

    return [...branchLabelRanges, ...externalLabelRanges];
}
