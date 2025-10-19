import { Position, Range, TextDocument, Uri } from "vscode";

import { ResourceData, ResourceDataType } from "@/resource/types";
import { getFileId } from "@/utils/getFileId";
import { scheduleWork } from "@/utils/scheduleWork";

import { labelManager } from "./data";
import { updateLabelDiagnostics } from "./diagnostic";
import { LabelData, LabelResourceType } from "./types/label";
import { BaseLabelDataType } from "./types/base";
import { BranchLabelData } from "./types/branchLabel";
import { refreshSemanticTokensFuncGenerator } from "@/semantic";

export const labelRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*):(?:.*;[ \t]*([^\n]+))?/gm;
export const externalLabelRegex = /^[ \t]*(?:extrn|global)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;
export const labelBehindBranchRegex = /^[ \t]*(?:CALL|RCALL|GOTO|BRA|BC|BNC|BN|BNN|BZ|BNZ|BOV|BNOV)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;

export const externalLabelsMap: Map<string, Set<string>> = new Map();

export let lastLabelAnalysisTimestamp: number = 0;

function callbackAfterAnalysis(delay: number = 100): void {
    lastLabelAnalysisTimestamp = Date.now();
    scheduleWork(
        "diagnostics.updateLabels",
        () => updateLabelDiagnostics(),
        delay
    );
    scheduleWork(
        "semantic.refreshLabels",
        refreshSemanticTokensFuncGenerator("label"),
        delay + 10
    );
}

function matchLabelsInText<T extends BaseLabelDataType>(
    text: string,
    document: TextDocument,
    matchRegex: RegExp,
    valueFactory: (props: Readonly<{
        name: string;
        comment?: string;
    }>) => T,
    parseCallback?: (props: Readonly<{
        name: string;
        comment?: string;
        position: Position;
        match: RegExpMatchArray;
    }>) => any
): ResourceDataType<T>[] {
    return [...text.matchAll(matchRegex)].map(m => {
        const labelName = m[1];
        const labelComment = m[2];
        const labelPosition = document.positionAt(m.index + m[0].indexOf(m[1]));
        parseCallback?.({
            name: labelName,
            comment: labelComment,
            position: labelPosition,
            match: m
        });

        return new ResourceData<T>({
            value: valueFactory({ name: labelName, comment: labelComment }),
            uri: document.uri,
            position: labelPosition,
            range: new Range(labelPosition, labelPosition.translate(0, labelName.length))
        });
    });
}

export function analyzeLabelsOfDocument(document: TextDocument): void {
    const fileUri = getFileId(document.uri);
    const text = document.getText();
    const currentFileLabelNames: Set<string> = new Set();

    // Match the labels defined in the current file
    const currentFileDefineLabel: LabelResourceType[] = matchLabelsInText(
        text, document, labelRegex,
        ({ name, comment }) => new LabelData({
            name: name,
            comment: comment ?? "",
            isExternal: false,
        }),
        ({ name }) => currentFileLabelNames.add(name)
    );

    // Initialize or clear external labels for this file
    if (externalLabelsMap.has(fileUri)) externalLabelsMap.get(fileUri)!.clear();
    else externalLabelsMap.set(fileUri, new Set<string>());
    const externalLabelNames = externalLabelsMap.get(fileUri)!;

    // Match the external labels in the current file
    const externalLabels: LabelResourceType[] = matchLabelsInText(
        text, document, externalLabelRegex,
        ({ name, comment }) => new LabelData({
            name: name,
            comment: comment ?? "",
            isExternal: true
        }),
        ({ name }) => {
            externalLabelNames.add(name);
            currentFileLabelNames.add(name);
        }
    )

    // Update the label manager with the combined labels
    labelManager.setLabelsOfUri(document.uri, [
        ...currentFileDefineLabel,
        ...externalLabels
    ]);

    // Match the labels used in branch instructions
    labelManager.setBranchLabelsOfUri(document.uri, matchLabelsInText(
        text, document, labelBehindBranchRegex,
        ({ name, comment }) => new BranchLabelData({
            name: name,
            comment: comment ?? "",
            missing: !currentFileLabelNames.has(name)
        })
    ));

    // Schedule diagnostic update
    callbackAfterAnalysis();

    // Update external labels existence for this file
    labelManager.updateExternalLabelsOfFileExistence(document.uri);
}

export function analyzeLabelsOfWorkspace(documents: TextDocument[]): void {
    labelManager.clear();
    documents.forEach(doc => analyzeLabelsOfDocument(doc));

    labelManager.updateExternalLabelsExistence();

    callbackAfterAnalysis();
}

export function removeLabelsOfDocument(uri: Uri): void {
    labelManager.removeLabelsOfUri(uri);

    callbackAfterAnalysis();
}
