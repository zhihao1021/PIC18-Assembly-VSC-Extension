import { Location, TextDocument } from "vscode";

import { includeManager } from "@/resource/include/data";
import { variableManager } from "@/resource/variable/data";
import { usageVariableRegex } from "@/resource/variable/usageVariableRegex";
import { getFileId } from "@/utils/getFileId";

const variableRegex = new RegExp(usageVariableRegex.source, "i");

export function checkVariableDefinition(
    word: string,
    lineText: string,
    startIndex: number,
    document: TextDocument,
    locations: Location[]
): void {
    const match = lineText.match(variableRegex);
    if (!match || match.index === undefined || startIndex !== match.index + match[0].indexOf(match[1])) return;
    const fileUri = getFileId(document.uri);

    const includeData = includeManager.recursiveIncludeMapData.get(fileUri);
    if (!includeData) return;

    includeData.forEach(uri => {
        const variableDefineMap = variableManager.fileMapDefineData.get(uri);
        if (!variableDefineMap) return;

        const variableData = variableDefineMap.get(word);
        if (!variableData) return;

        locations.push(new Location(
            variableData.uri,
            variableData.position
        ));
    });
}
