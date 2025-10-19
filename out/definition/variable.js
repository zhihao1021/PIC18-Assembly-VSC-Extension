import { includesData } from "@/resource/includes";
import { variableData } from "@/resource/variable";
import { variableRegexGenerator } from "@/semantic/module/variable";
import { Location, workspace } from "vscode";
export function checkVariableDefinition(word, lineText, startIndex, document, locations) {
    const variableMatch = lineText.match(variableRegexGenerator(word, "i"));
    if (!variableMatch || variableMatch.index === undefined || startIndex !== variableMatch.index + variableMatch[0].indexOf(variableMatch[1])) {
        return;
    }
    const docPath = workspace.asRelativePath(document.uri, false).toLowerCase();
    const docVariables = variableData.get(docPath) ?? [];
    const includeVariables = (includesData.get(docPath) ?? []).flatMap(uri => {
        const includePath = workspace.asRelativePath(uri, false).toLowerCase();
        return variableData.get(includePath) ?? [];
    });
    const variables = [...docVariables, ...includeVariables];
    if (variables.length === 0)
        return;
    locations.push(...variables.filter(({ value }) => value.name === word).map(variable => new Location(variable.uri, variable.position)));
}
//# sourceMappingURL=variable.js.map