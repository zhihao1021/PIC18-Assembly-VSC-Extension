import { Range } from "vscode";
import { getFileId } from "@/utils/getFileId";
import { scheduleWork } from "@/utils/scheduleWork";
import { variableManager } from "./data";
import { updateVariableDiagnostics } from "./diagnostic";
import { refreshSemanticTokens } from "@/semantic/index";
import { VariableDefineData, VariableDefineResource } from "./types/variableDefine";
export const variableDefineRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*)[ \t]+EQU[ \t]+(\S+)(?:.*;[ \t]*(\S+))?/gmi;
export const variableUsageRegex = /(?:^|[, \t]+)(\S+)(?:$|[, \t])/gmi;
export function analyzeVariablesOfDocument(document) {
    const fileUri = getFileId(document.uri);
    const text = document.getText();
    variableManager.setDefineVariablesOfUri(document.uri, [...text.matchAll(variableDefineRegex)].map(m => {
        const varName = m[1];
        const varValue = m[2];
        const varComment = m[3];
        const varPosition = document.positionAt(m.index + m[0].indexOf(m[1]));
        return new VariableDefineResource({
            value: new VariableDefineData({
                name: varName,
                value: varValue,
                comment: varComment
            }),
            uri: document.uri,
            position: varPosition,
            range: new Range(varPosition, varPosition.translate(0, varName.length))
        });
    }));
    // Schedule diagnostic update
    scheduleWork("diagnostics.updateVariables", () => updateVariableDiagnostics(), 150);
    // request semantic tokens refresh after diagnostics update
    scheduleWork("semantic.refreshAfterVariables", () => refreshSemanticTokens(), 160);
}
export function analyzeVariablesOfWorkspace(documents) {
    variableManager.clear();
    documents.forEach(doc => analyzeVariablesOfDocument(doc));
    scheduleWork("diagnostics.updateVariables", () => updateVariableDiagnostics(), 100);
    // request semantic tokens refresh after diagnostics update
    scheduleWork("semantic.refreshAfterVariables", () => refreshSemanticTokens(), 120);
}
export function removeVariablesOfDocument(uri) {
    variableManager.removeDefineVariablesOfUri(uri);
    scheduleWork("diagnostics.updateVariables", () => updateVariableDiagnostics(), 100);
    // request semantic tokens refresh after diagnostics update
    scheduleWork("semantic.refreshAfterVariables", () => refreshSemanticTokens(), 110);
}
//# sourceMappingURL=analyze.js.map