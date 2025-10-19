import { getFileId } from "@/utils/getFileId";
class DataManager {
    get fileMapData() {
        return this._fileMapData;
    }
    get labelNameMapData() {
        return this._labelNameMapData;
    }
    get branchLabelFileMapData() {
        return this._branchLabelFileMapData;
    }
    constructor() {
        this._fileMapData = new Map();
        this._labelNameMapData = new Map();
        this._branchLabelFileMapData = new Map();
    }
    labelEquals(a, b) {
        return getFileId(a.uri) === getFileId(b.uri)
            && a.position.isEqual(b.position)
            && a.value.name === b.value.name
            && a.value.comment === b.value.comment
            && a.value.isExternal === b.value.isExternal;
    }
    push(label, mode) {
        if (mode === undefined || mode === "filenameOnly") {
            const labelFileUri = getFileId(label.uri);
            const filenameMap = this._fileMapData.get(labelFileUri);
            if (filenameMap)
                filenameMap.push(label);
            else
                this._fileMapData.set(labelFileUri, [label]);
        }
        if (mode === undefined || mode === "labelNameOnly") {
            const labelName = label.value.name;
            const labelNameMap = this._labelNameMapData.get(labelName);
            if (labelNameMap)
                labelNameMap.push(label);
            else
                this._labelNameMapData.set(labelName, [label]);
        }
    }
    remove(label, mode) {
        if (mode === undefined || mode === "filenameOnly") {
            const labelFileUri = getFileId(label.uri);
            const filenameMap = this._fileMapData.get(labelFileUri);
            if (filenameMap) {
                filenameMap.splice(filenameMap.indexOf(label), 1);
                if (filenameMap.length === 0)
                    this._fileMapData.delete(labelFileUri);
            }
        }
        if (mode === undefined || mode === "labelNameOnly") {
            const labelName = label.value.name;
            const labelNameMap = this._labelNameMapData.get(labelName);
            if (labelNameMap) {
                labelNameMap.splice(labelNameMap.indexOf(label), 1);
                if (labelNameMap.length === 0)
                    this._labelNameMapData.delete(labelName);
            }
        }
        const { name, isExternal } = label.value;
        if (isExternal) {
            const nameMap = this._labelNameMapData.get(name);
            label.value.exists = nameMap ? nameMap.some(l => !l.value.isExternal) : false;
        }
    }
    clear() {
        this._fileMapData.clear();
        this._labelNameMapData.clear();
    }
    setLabelsOfUri(uri, labels) {
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
        const newLabels = [];
        const sameLabels = [];
        labels.forEach(newLabel => {
            const existsLabel = existingLabels.find(existingLabel => this.labelEquals(existingLabel, newLabel));
            if (existsLabel)
                sameLabels.push(existsLabel);
            else
                newLabels.push(newLabel);
        });
        const toRemoveLabels = existingLabels.filter(existingLabel => !sameLabels.includes(existingLabel));
        toRemoveLabels.forEach(data => this.remove(data, "labelNameOnly"));
        newLabels.forEach(data => this.push(data, "labelNameOnly"));
        this._fileMapData.set(fileUri, [...sameLabels, ...newLabels]);
    }
    setBranchLabelsOfUri(uri, labels) {
        const fileUri = getFileId(uri);
        this._branchLabelFileMapData.set(fileUri, labels);
    }
    removeLabelsOfUri(uri) {
        const fileUri = getFileId(uri);
        this._branchLabelFileMapData.delete(fileUri);
        const existingLabels = this._fileMapData.get(fileUri);
        if (!existingLabels)
            return;
        this._fileMapData.delete(fileUri);
        existingLabels.forEach(data => this.remove(data, "labelNameOnly"));
        this.updateExternalLabelsExistence();
    }
    updateExternalLabelsOfFileExistence(uri) {
        const fileUri = getFileId(uri);
        this._fileMapData.get(fileUri)?.forEach(label => {
            label.value.exists = this._labelNameMapData.get(label.value.name)?.some(l => !l.value.isExternal) ?? false;
        });
    }
    updateExternalLabelsExistence() {
        this._labelNameMapData.forEach(labels => labels.filter(label => label.value.isExternal).forEach(label => {
            label.value.exists = labels.some(l => !l.value.isExternal);
        }));
    }
}
export const labelManager = new DataManager();
//# sourceMappingURL=data.js.map