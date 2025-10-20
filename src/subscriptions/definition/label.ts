import { Location, Position, TextDocument } from "vscode";

import { externalLabelRegex, labelBehindBranchRegex } from "@/resource/label/analyze";
import { labelManager } from "@/resource/label/data";
import { getFileId } from "@/utils/getFileId";

const branchRegex = new RegExp(labelBehindBranchRegex.source, "i");
const externalRegex = new RegExp(externalLabelRegex.source, "i");

export function checkLabelDefinition(
    word: string,
    lineText: string,
    startIndex: number,
    document: TextDocument,
    position: Position,
    locations: Location[]
): void {
    const fileUri = getFileId(document.uri);
    const match = lineText.match(branchRegex) || lineText.match(externalRegex);
    if (!match || match.index === undefined || startIndex !== match.index + match[0].indexOf(match[1])) return;

    const label = labelManager.branchLabelFileMapData.get(fileUri)?.get(word)?.find(l => (!l.value.missing || l.value.macro) && l.range.contains(position));
    if (!label) return;

    const { value: { name, macro } } = label;
    if (macro) {
        const { position: macroPosition, value: { parameters } } = macro;
        locations.push(new Location(
            label.uri, parameters.get(name)?.[0].position ?? macroPosition
        ));
        return;
    }

    locations.push(...labelManager.labelNameMapData.get(word)?.filter(
        ({ value: { isExternal } }) => !isExternal
    ).map(({ uri, position }) => new Location(
        uri, position
    )) ?? []);
}
