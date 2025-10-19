import { Range } from "vscode";
import { ResourceData } from "@/resource/types";
import { getFileId } from "@/utils/getFileId";
import { scheduleWork } from "@/utils/scheduleWork";
import { labelManager } from "./data";
import { updateLabelDiagnostics } from "./diagnostic";
import { LabelData } from "./types/label";
import { BranchLabelData } from "./types/branchLabel";
import { refreshSemanticTokens } from "@/semantic";
export const labelRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*):(?:.*;[ \t]*(\S+))?/gm;
export const externalLabelRegex = /^[ \t]*(?:extrn|global)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;
export const labelBehindBranchRegex = /^[ \t]*(?:CALL|RCALL|GOTO|BRA|BC|BN|BNZ|BZ)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;
export const externalLabelsMap = new Map();
export let lastAnalysisTimestamp = 0;
function callbackAfterAnalysis(delay = 100) {
    lastAnalysisTimestamp = Date.now();
    scheduleWork("diagnostics.updateLabels", () => updateLabelDiagnostics(), delay);
    scheduleWork("semantic.refreshLabels", () => refreshSemanticTokens(), delay + 10);
}
function matchLabelsInText(text, document, matchRegex, valueFactory, parseCallback) {
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
        return new ResourceData({
            value: valueFactory({ name: labelName, comment: labelComment }),
            uri: document.uri,
            position: labelPosition,
            range: new Range(labelPosition, labelPosition.translate(0, labelName.length))
        });
    });
}
export function analyzeLabelsOfDocument(document) {
    const fileUri = getFileId(document.uri);
    const text = document.getText();
    const currentFileLabelNames = new Set();
    // Match the labels defined in the current file
    const currentFileDefineLabel = matchLabelsInText(text, document, labelRegex, ({ name, comment }) => new LabelData({
        name: name,
        comment: comment ?? "",
        isExternal: false,
    }), ({ name }) => currentFileLabelNames.add(name));
    // Initialize or clear external labels for this file
    if (externalLabelsMap.has(fileUri))
        externalLabelsMap.get(fileUri).clear();
    else
        externalLabelsMap.set(fileUri, new Set());
    const externalLabelNames = externalLabelsMap.get(fileUri);
    // Match the external labels in the current file
    const externalLabels = matchLabelsInText(text, document, externalLabelRegex, ({ name, comment }) => new LabelData({
        name: name,
        comment: comment ?? "",
        isExternal: true
    }), ({ name }) => {
        externalLabelNames.add(name);
        currentFileLabelNames.add(name);
    });
    // Update the label manager with the combined labels
    labelManager.setLabelsOfUri(document.uri, [
        ...currentFileDefineLabel,
        ...externalLabels
    ]);
    // Match the labels used in branch instructions
    labelManager.setBranchLabelsOfUri(document.uri, matchLabelsInText(text, document, labelBehindBranchRegex, ({ name, comment }) => new BranchLabelData({
        name: name,
        comment: comment ?? "",
        missing: !currentFileLabelNames.has(name)
    })));
    // Schedule diagnostic update
    callbackAfterAnalysis();
    // Update external labels existence for this file
    labelManager.updateExternalLabelsOfFileExistence(document.uri);
}
export function analyzeLabelsOfWorkspace(documents) {
    labelManager.clear();
    documents.forEach(doc => analyzeLabelsOfDocument(doc));
    labelManager.updateExternalLabelsExistence();
    callbackAfterAnalysis();
}
export function removeLabelsOfDocument(uri) {
    labelManager.removeLabelsOfUri(uri);
    callbackAfterAnalysis();
}
//# sourceMappingURL=analyze.js.map