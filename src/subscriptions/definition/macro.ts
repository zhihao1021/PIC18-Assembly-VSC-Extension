import { Location, TextDocument } from "vscode";

import { labelManager } from "@/resource/label/data";
import { macroUsageRegex } from "@/resource/macro/analyze";
import { macroManager } from "@/resource/macro/data";
import { getFileId } from "@/utils/getFileId";

const macroRegex = new RegExp(macroUsageRegex.source, "i");

export function checkMacroDefinition(
    word: string,
    lineText: string,
    startIndex: number,
    document: TextDocument,
    locations: Location[]
): void {
    const match = lineText.match(macroRegex);
    if (!match || match.index === undefined || startIndex !== match.index + match[0].indexOf(match[1])) return;

    const fileUri = getFileId(document.uri);

    macroManager.fileIncludeMapMacroData.get(fileUri)?.forEach(macro => {
        if (macro.value.name === word) {
            locations.push(new Location(
                macro.uri,
                macro.position
            ));
        }
    });
}
