import { Range, TextDocument } from "vscode";

import { labelManager } from "@/resource/label/data";
import { getFileId } from "@/utils/getFileId";
import { variableManager } from "@/resource/variable/data";

export function getLabelRanges(document: TextDocument): Range[] {
    const fileUri = getFileId(document.uri);

    const branchLabelRanges = [...labelManager.branchLabelFileMapData.get(fileUri)?.values() ?? []].flat().filter(
        l => !l.value.missing || l.value.macro
    ).map(l => l.range) ?? [];
    const externalLabelRanges = labelManager.fileMapData.get(fileUri)?.filter(
        l => l.value.isExternal && l.value.exists
    ).map(l => l.range) ?? [];

    const labelAsVariableRanges = [...variableManager.fileMapUsageData.get(fileUri)?.values() ?? []].flat().filter(
        l => {
            const labelData = labelManager.labelNameMapData.get(l.value.name);
            return labelData !== undefined;
        }
    ).map(l => l.range) ?? [];

    return [...branchLabelRanges, ...externalLabelRanges, ...labelAsVariableRanges];
}
