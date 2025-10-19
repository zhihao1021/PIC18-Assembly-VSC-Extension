import { externalLabelRegex, labelBehindBranchRegex } from "@/resource/label/analyze";
import { labelManager } from "@/resource/label/data";
import { getFileId } from "@/utils/getFileId";
import { Range } from "vscode";
export function pushLabelRanges(document, builder) {
    const fileUri = getFileId(document.uri);
    const documentText = document.getText();
    const branchLabels = labelManager.branchLabelFileMapData.get(fileUri)?.map(l => l.value.name) ?? [];
    [...documentText.matchAll(labelBehindBranchRegex)].forEach(m => {
        const instruction = m[0];
        const label = m[1];
        if (!branchLabels.includes(label))
            return;
        const position = document.positionAt(m.index + instruction.indexOf(label));
        builder.push(new Range(position.line, position.character, position.line, position.character + label.length), "function");
    });
    const externalLabels = labelManager.fileMapData.get(fileUri)?.filter(({ value: { isExternal } }) => isExternal).map(l => l.value.name) ?? [];
    [...documentText.matchAll(externalLabelRegex)].forEach(m => {
        const instruction = m[0];
        const label = m[1];
        if (!externalLabels.includes(label))
            return;
        const position = document.positionAt(m.index + instruction.indexOf(label));
        builder.push(new Range(position.line, position.character, position.line, position.character + label.length), "function");
    });
}
//# sourceMappingURL=label.js.map