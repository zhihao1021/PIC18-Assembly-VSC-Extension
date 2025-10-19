import { Range, workspace } from "vscode";
import { variableData } from "@/resource/variable";
import { includesData } from "@/resource/includes";
export const variableRegexGenerator = (name, flag = "gm") => new RegExp(`(?:^|,|\\s+)(${name})(?:\\s+|,|$)`, flag);
export function pushVariableRanges(document, builder) {
    const docPath = workspace.asRelativePath(document.uri, false).toLowerCase();
    const documentText = document.getText();
    const docVariables = variableData.get(docPath) ?? [];
    const includeVariables = (includesData.get(docPath) ?? []).flatMap(uri => {
        const includePath = workspace.asRelativePath(uri, false).toLowerCase();
        return variableData.get(includePath) ?? [];
    });
    [...docVariables, ...includeVariables].forEach(({ value: { name } }) => {
        [...documentText.matchAll(variableRegexGenerator(name))].forEach(m => {
            const instruction = m[0];
            const variable = m[1];
            const position = document.positionAt(m.index + instruction.indexOf(variable));
            builder.push(new Range(position.line, position.character, position.line, position.character + variable.length), "variable");
        });
    });
}
//# sourceMappingURL=variable.js.map