import { Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { LabelResourceType } from "./types/label";
import { BranchLabelResourceType } from "./types/branchLabel";

class DataManager {
    private _fileMapData: Map<string, LabelResourceType[]>;
    private _labelNameMapData: Map<string, LabelResourceType[]>;
    private _branchLabelFileMapData: Map<string, BranchLabelResourceType[]>;

    get fileMapData(): Map<string, LabelResourceType[]> {
        return this._fileMapData;
    }

    get labelNameMapData(): Map<string, LabelResourceType[]> {
        return this._labelNameMapData;
    }

    get branchLabelFileMapData(): Map<string, BranchLabelResourceType[]> {
        return this._branchLabelFileMapData;
    }

    constructor() {
        this._fileMapData = new Map();
        this._labelNameMapData = new Map();
        this._branchLabelFileMapData = new Map();
    }

    private labelEquals(a: LabelResourceType, b: LabelResourceType): boolean {
        return getFileId(a.uri) === getFileId(b.uri)
            && a.position.isEqual(b.position)
            && a.value.name === b.value.name
            && a.value.comment === b.value.comment
            && a.value.isExternal === b.value.isExternal;
    }

    private push(label: LabelResourceType, mode?: "filenameOnly" | "labelNameOnly"): void {
        if (mode === undefined || mode === "filenameOnly") {
            const labelFileUri = getFileId(label.uri);
            const filenameMap = this._fileMapData.get(labelFileUri);
            if (filenameMap) filenameMap.push(label);
            else this._fileMapData.set(labelFileUri, [label]);
        }

        if (mode === undefined || mode === "labelNameOnly") {
            const labelName = label.value.name;
            const labelNameMap = this._labelNameMapData.get(labelName);
            if (labelNameMap) labelNameMap.push(label);
            else this._labelNameMapData.set(labelName, [label]);
        }
    }

    private remove(label: LabelResourceType, mode?: "filenameOnly" | "labelNameOnly"): void {
        if (mode === undefined || mode === "filenameOnly") {
            const labelFileUri = getFileId(label.uri);
            const filenameMap = this._fileMapData.get(labelFileUri);
            if (filenameMap) {
                filenameMap.splice(filenameMap.indexOf(label), 1);
                if (filenameMap.length === 0) this._fileMapData.delete(labelFileUri);
            }
        }

        if (mode === undefined || mode === "labelNameOnly") {
            const labelName = label.value.name;
            const labelNameMap = this._labelNameMapData.get(labelName);
            if (labelNameMap) {
                labelNameMap.splice(labelNameMap.indexOf(label), 1);
                if (labelNameMap.length === 0) this._labelNameMapData.delete(labelName);
            }
        }

        const { name, isExternal } = label.value;

        if (isExternal) {
            const nameMap = this._labelNameMapData.get(name);
            label.value.exists = nameMap ? nameMap.some(l => !l.value.isExternal) : false;
        }
    }

    public clear(): void {
        this._fileMapData.clear();
        this._labelNameMapData.clear();
    }

    public setLabelsOfUri(uri: Uri, labels: LabelResourceType[]): void {
        if (labels.length === 0) {
            this.removeLabelsOfUri(uri);
            return;
        }

        const fileUri = getFileId(uri);
        const existingLabels = this._fileMapData.get(fileUri);
        if (!existingLabels) {
            this._fileMapData.set(fileUri, labels);
            labels.forEach(data => this.push(data, "labelNameOnly"));
            return;
        }

        const newLabels: LabelResourceType[] = [];
        const sameLabels: LabelResourceType[] = [];

        labels.forEach(newLabel => {
            const existsLabel = existingLabels.find(existingLabel => this.labelEquals(existingLabel, newLabel));
            if (existsLabel) sameLabels.push(existsLabel);
            else newLabels.push(newLabel);
        });

        const toRemoveLabels: LabelResourceType[] = existingLabels.filter(existingLabel => !sameLabels.includes(existingLabel));
        toRemoveLabels.forEach(data => this.remove(data, "labelNameOnly"));
        newLabels.forEach(data => this.push(data, "labelNameOnly"));

        this._fileMapData.set(fileUri, [...sameLabels, ...newLabels]);
    }

    public setBranchLabelsOfUri(uri: Uri, labels: BranchLabelResourceType[]): void {
        const fileUri = getFileId(uri);
        this._branchLabelFileMapData.set(fileUri, labels);
    }

    public removeLabelsOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        this._branchLabelFileMapData.delete(fileUri);

        const existingLabels = this._fileMapData.get(fileUri);
        if (!existingLabels) return;

        this._fileMapData.delete(fileUri);
        existingLabels.forEach(data => this.remove(data, "labelNameOnly"));

        this.updateExternalLabelsExistence();
    }

    public updateExternalLabelsOfFileExistence(uri: Uri): void {
        const fileUri = getFileId(uri);

        this._fileMapData.get(fileUri)?.forEach(label => {
            label.value.exists = this._labelNameMapData.get(label.value.name)?.some(l => !l.value.isExternal) ?? false;
        });
    }

    public updateExternalLabelsExistence(): void {
        this._labelNameMapData.forEach(labels => labels.filter(label => label.value.isExternal).forEach(label => {
            label.value.exists = labels.some(l => !l.value.isExternal);
        }));
    }
}

export const labelManager = new DataManager();
