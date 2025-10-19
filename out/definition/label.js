import { Location } from "vscode";
import { externalLabelRegex, labelBehindBranchRegex } from "@/resource/label/analyze";
import { labelManager } from "@/resource/label/data";
const branchRegex = new RegExp(labelBehindBranchRegex.source, "i");
const externalRegex = new RegExp(externalLabelRegex.source, "i");
export function checkLabelDefinition(word, lineText, startIndex, locations) {
    const match = lineText.match(branchRegex) || lineText.match(externalRegex);
    if (!match || match.index === undefined || startIndex !== match.index + match[0].indexOf(match[1]))
        return;
    locations.push(...labelManager.labelNameMapData.get(word)?.filter(({ value: { isExternal } }) => !isExternal).map(({ uri, position }) => new Location(uri, position)) ?? []);
}
//# sourceMappingURL=label.js.map