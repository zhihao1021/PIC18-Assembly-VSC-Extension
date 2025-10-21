import { Location, Position, TextDocument } from "vscode";

import { includeManager } from "@/resource/include/data";
import { variableManager } from "@/resource/variable/data";
import { usageVariableRegex } from "@/resource/variable/usageVariableRegex";
import { getFileId } from "@/utils/getFileId";
import { labelManager } from "@/resource/label/data";

const variableRegex = new RegExp(usageVariableRegex.source, "gi");

export function checkVariableDefinition(
    word: string,
    lineText: string,
    startIndex: number,
    document: TextDocument,
    position: Position,
    locations: Location[]
): void {
    const match = [...lineText.matchAll(variableRegex)].find(m => m.index >= startIndex);
    if (!match || match.index === undefined || startIndex !== match.index + match[0].indexOf(match[1])) return;
    const fileUri = getFileId(document.uri);

    const includeData = includeManager.recursiveIncludeMapData.get(fileUri);
    if (!includeData) return;

    const variableData = variableManager.fileMapUsageData.get(fileUri)?.get(word)?.find(d => {
        return (d.value.exists || d.value.macro) && d.range.contains(position);
    });
    if (!variableData) {
        const labelData = labelManager.labelNameMapData.get(word);
        if (labelData) {
            locations.push(...labelData.map(({ uri, position }) => new Location(
                uri,
                position
            )));
        }
        return;
    }

    const macroData = variableData?.value.macro;
    if (macroData) {
        macroData.value.parameters.get(word)?.forEach(d => {
            locations.push(new Location(
                d.uri,
                d.position
            ));
        });
        return;
    }

    includeData.forEach(uri => {
        const variableDefineData = variableManager.fileMapDefineData.get(uri)?.get(word);
        if (!variableDefineData) return;

        locations.push(new Location(
            variableDefineData.uri,
            variableDefineData.position
        ));
    });
}
