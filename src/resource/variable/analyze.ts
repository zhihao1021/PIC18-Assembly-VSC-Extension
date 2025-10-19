import { Range, TextDocument, Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { scheduleWork } from "@/utils/scheduleWork";

import { variableManager } from "./data";
import { updateVariableDiagnostics } from "./diagnostic";
import { refreshSemanticTokensFuncGenerator } from "@/semantic/index";
import { VariableDefineData, VariableDefineResource } from "./types/variableDefine";
import { usageVariableRegex } from "./usageVariableRegex";
import { VariableData, VariableResource } from "./types/variable";
import { includeManager } from "../include/data";

export const variableEquRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*)[ \t]+EQU[ \t]+(\S+)(?:.*;[ \t]*([^\n]+))?/gmi;
export const variableDefineRegex = /^[ \t]*#define[ \t]+(\S+)[ \t]+([^\n]*)$/gmi;

export let lastVariableAnalysisTimestamp: number = 0;

function callbackAfterAnalysis(delay: number = 100): void {
    lastVariableAnalysisTimestamp = Date.now();
    scheduleWork(
        "diagnostics.updateVariables",
        () => updateVariableDiagnostics(),
        delay
    );
    scheduleWork(
        "semantic.refreshVariables",
        refreshSemanticTokensFuncGenerator("variable"),
        delay + 10
    );
}

export function analyzeVariablesOfDocument(document: TextDocument): void {
    const fileUri = getFileId(document.uri);
    const text = document.getText();

    variableManager.setDefineVariablesOfUri(document.uri, [
        ...text.matchAll(variableEquRegex),
        ...text.matchAll(variableDefineRegex)
    ].map(m => {
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

    variableManager.setUsageVariablesOfUri(document.uri, [...text.matchAll(usageVariableRegex)].map(m => {
        const varName = m[1];
        const varPosition = document.positionAt(m.index + m[0].indexOf(m[1]));

        return new VariableResource({
            value: new VariableData({
                name: varName
            }),
            uri: document.uri,
            position: varPosition,
            range: new Range(varPosition, varPosition.translate(0, varName.length))
        })
    }));

    includeManager.fileMapData.get(fileUri)?.value.referencedBy.forEach(uri => {
        const includeData = includeManager.fileMapData.get(uri);
        if (!includeData) return;
        variableManager.refreshUsageVariablesExistsOfUri(includeData.uri);
    });

    callbackAfterAnalysis();
}

export function analyzeVariablesOfWorkspace(documents: TextDocument[]): void {
    variableManager.clear();
    documents.forEach(doc => analyzeVariablesOfDocument(doc));

    variableManager.refreshAllUsageVariablesExists();

    callbackAfterAnalysis();
}

export function removeVariablesOfDocument(uri: Uri): void {
    variableManager.removeDefineVariablesOfUri(uri);
    variableManager.removeUsageVariablesOfUri(uri);

    callbackAfterAnalysis();
}
