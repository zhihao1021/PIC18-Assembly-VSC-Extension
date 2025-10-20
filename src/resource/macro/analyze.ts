import { Position, Range, TextDocument, Uri } from "vscode";

import { refreshSemanticTokensFuncGenerator } from "@/semantic";
import { scheduleWork } from "@/utils/scheduleWork";
import { getFileId } from "@/utils/getFileId";

import { ResourceDataType } from "../types";
import { variableManager } from "../variable/data";
import { usageVariableRegex } from "../variable/usageVariableRegex";
import { BaseVariableDataType } from "../variable/types/base";
import { VariableDefineData, VariableDefineResource } from "../variable/types/variableDefine";

import { macroManager } from "./data";
import { updateMacroDiagnostics } from "./diagnostic";
import { MacroData, MacroResource, MacroResourceType } from "./types/macro";
import { labelBehindBranchRegex } from "../label/analyze";
import { labelManager } from "../label/data";

export const macroUsageRegex = /(?<=^[ \t]*)((?:[A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[ \t]+)(?!\bMACRO\b))(?:[ \t]*$|([^\n]*))/gmi;

type MacroMatchData<T extends BaseVariableDataType, U extends ResourceDataType<T>> = Readonly<{
    fullMacroText: string;
    macroName: string;
    macroParamsText: string;
    macroParamsPosition: Position;
    macroParamsTextList: string[];
    macroParams: U[];
    macroComment: string;
    macroStartPosition: Position;
    macroEndPosition: Position;
    macroRange: Range;
    matchArray: RegExpMatchArray;
}>;

export const macroRegex = /^[ \t]*(\S+)[ \t]+MACRO[ \t]+([^;\n]*)(?:$|;[ \t]*(.*))(?:[\s\S](?!ENDM|.*MACRO))*(?:\n)?[ \t]*(ENDM)?/gmi;

export let lastMacroAnalysisTimestamp: number = 0;

function callbackAfterAnalysis(delay: number = 100): void {
    lastMacroAnalysisTimestamp = Date.now();
    scheduleWork(
        "diagnostics.updateMacros",
        () => updateMacroDiagnostics(),
        delay
    );
    scheduleWork(
        "semantic.refreshVariables",
        refreshSemanticTokensFuncGenerator("variable"),
        delay + 10
    );
}

function matchMacro<T extends BaseVariableDataType, U extends ResourceDataType<T>>(
    document: TextDocument,
    text: string,
    regex: RegExp,
    dataGenerator: (name: string, uri: Uri, position: Position, range: Range, i: number) => U,
    macroGenerator: (matchData: MacroMatchData<T, U>) => MacroResourceType,
    post?: (matchData: MacroMatchData<T, U>, macroData: MacroResourceType) => any
): MacroResourceType[] {
    return [...text.matchAll(regex)].map(m => {
        const fullMacroText = m[0];
        const macroName = m[1];
        const macroParamsText = m[2];
        const macroParamsPosition = document.positionAt(m.index + m[0].indexOf(macroParamsText));
        const macroParamsTextList = macroParamsText ? macroParamsText.split(",").map(p => p.trim()).filter(p => p.length > 0) : [];
        const macroParams = macroParamsTextList.map((paramName, i) => {
            const paramPosition = macroParamsPosition.translate(0, macroParamsText.indexOf(paramName));
            return dataGenerator(
                paramName,
                document.uri,
                paramPosition,
                new Range(paramPosition, paramPosition.translate(0, paramName.length)),
                i
            );
        });
        const macroComment = m[3] || "";

        const macroStartPosition = document.positionAt(m.index + m[0].indexOf(macroName));
        const macroEndPosition = document.positionAt(m.index + fullMacroText.trimEnd().length);
        const macroRange = new Range(macroStartPosition, macroEndPosition);

        const matchData = {
            fullMacroText,
            macroName,
            macroParamsText,
            macroParamsPosition,
            macroParamsTextList,
            macroParams,
            macroComment,
            macroStartPosition,
            macroEndPosition,
            macroRange,
            matchArray: m
        }
        const result = macroGenerator(matchData);

        post?.(matchData, result);

        return result;
    });
}

export function analyzeMacrosOfDocument(document: TextDocument): void {
    // Must be run after variable and label analysis
    const fileUri = getFileId(document.uri);
    const text = document.getText();

    macroManager.setMacrosOfUri(document.uri, matchMacro(
        document, text, macroRegex,
        (name, uri, position, range) => new VariableDefineResource({
            value: new VariableDefineData({
                value: "Macro Parameter",
                name: name
            }),
            uri: uri,
            position: position,
            range: range
        }),
        ({ macroName, macroParams, macroComment, macroStartPosition, macroRange, matchArray }) => new MacroResource({
            value: new MacroData({
                name: macroName,
                parameters: macroParams,
                illegal: !matchArray[4],
                comment: macroComment
            }),
            uri: document.uri,
            position: macroStartPosition,
            range: macroRange
        }),
        ({ fullMacroText, macroParamsTextList, macroRange }, result) => {
            const currentFileVariablesMap = variableManager.fileMapUsageData.get(fileUri);
            if (currentFileVariablesMap) {
                [...fullMacroText.matchAll(usageVariableRegex)].forEach(varMatch => {
                    const varName = varMatch[1];
                    if (!macroParamsTextList.includes(varName)) return;
                    if (!currentFileVariablesMap.has(varName)) return;

                    currentFileVariablesMap.get(varName)!.forEach(varData => {
                        if (!macroRange.contains(varData.position)) return;

                        varData.value.macro = result;
                    });
                });
            }

            const currentFileLabelsMap = labelManager.branchLabelFileMapData.get(fileUri);
            if (currentFileLabelsMap) {
                [...fullMacroText.matchAll(labelBehindBranchRegex)].forEach(labelMatch => {
                    const labelName = labelMatch[1];
                    if (!macroParamsTextList.includes(labelName)) return;
                    if (!currentFileLabelsMap.has(labelName)) return;

                    currentFileLabelsMap.get(labelName)!.forEach(labelData => {
                        if (!macroRange.contains(labelData.position)) return;

                        labelData.value.macro = result;
                    });
                });
            }
        }
    ));

    callbackAfterAnalysis();
}

export function analyzeMacrosOfWorkspace(documents: TextDocument[]): void {
    documents.forEach(analyzeMacrosOfDocument);
    documents.forEach(doc => {
        macroManager.refreshIncludeMacrosOfUri(doc.uri);
        analyzeMacrosUsageOfDocument(doc);
    });

    callbackAfterAnalysis();
}

export function removeMacrosOfDocument(uri: Uri): void {
    macroManager.removeMacrosOfUri(uri);
    macroManager.removeMacroUsageOfUri(uri);

    callbackAfterAnalysis();
}

export function analyzeMacrosUsageOfDocument(document: TextDocument): void {
    const fileUri = getFileId(document.uri);
    const text = document.getText();

    const availableMacros = new Map<string, MacroResource>();
    macroManager.fileIncludeMapMacroData.get(fileUri)?.forEach(macro => {
        availableMacros.set(macro.value.name, macro);
    });

    const macroUsageList: MacroResourceType[] = [];
    availableMacros.forEach(({ value: { rawParameters } }, name) => {
        const matchRegex = new RegExp(`(?<=^[ \\t]*)(${name}(?:$|[ \\t]+)(?!\\bMACRO\\b))(?:[ \\t]*$|([^\\n]*))`, "gmi");

        macroUsageList.push(...matchMacro(
            document, text, matchRegex,
            (name, uri, position, range, i) => new VariableDefineResource({
                value: new VariableDefineData({
                    name: rawParameters[i]?.value.name ?? "",
                    value: name,
                }),
                uri: uri,
                position: position,
                range: range
            }),
            ({ macroParams, macroStartPosition, macroEndPosition, macroRange }) => {
                const illegal = macroParams.length !== rawParameters.length;
                const parameters = macroParams;
                if (parameters.length < rawParameters.length) {
                    for (let i = parameters.length; i < rawParameters.length; i++) {
                        const paramName = rawParameters[i].value.name ?? `param${i + 1}`;

                        parameters.push(new VariableDefineResource({
                            value: new VariableDefineData({
                                name: paramName,
                                value: "",
                            }),
                            uri: document.uri,
                            position: macroEndPosition,
                            range: new Range(macroEndPosition, macroEndPosition)
                        }));
                    }
                }

                const result = new MacroResource({
                    value: new MacroData({
                        name: name,
                        parameters: parameters,
                        illegal: illegal,
                        comment: ""
                    }),
                    uri: document.uri,
                    position: macroStartPosition,
                    range: macroRange
                });

                return result;
            }
        ));
    });
    macroManager.setMacroUsageOfUri(document.uri, macroUsageList);


    callbackAfterAnalysis();
    scheduleWork(
        "semantic.refreshMacros",
        refreshSemanticTokensFuncGenerator("macro"),
        100
    );
}
