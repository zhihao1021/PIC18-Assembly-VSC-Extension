import { getFileId } from "@/utils/getFileId";
class DataManager {
    get fileMapData() {
        return this._fileMapData;
    }
    constructor() {
        this._fileMapData = new Map();
    }
    push(include) {
        const fileUri = getFileId(include.uri);
        this._fileMapData.set(fileUri, include);
        include.value.includes.forEach(includedFileUri => {
            const includedFileData = this._fileMapData.get(includedFileUri);
            if (!includedFileData)
                return;
            includedFileData.value.referencedBy.add(fileUri);
        });
    }
    remove(include) {
        const fileUri = getFileId(include.uri);
        const includeData = this._fileMapData.get(fileUri);
        if (!includeData)
            return;
        this._fileMapData.delete(fileUri);
        includeData.value.referencedBy.forEach(referencingFileUri => {
            const referencingIncludeData = this._fileMapData.get(referencingFileUri);
            if (!referencingIncludeData)
                return;
            referencingIncludeData.value.includes.delete(fileUri);
        });
    }
    clear() {
        this._fileMapData.clear();
    }
    setIncludeOfUri(uri, include) {
        const fileUri = getFileId(uri);
        const existingReferences = this._fileMapData.get(fileUri)?.value.referencedBy;
        if (existingReferences) {
            include.value.referencedBy = existingReferences;
        }
        this.push(include);
    }
    removeIncludeOfUri(uri) {
        const fileUri = getFileId(uri);
        const existInclude = this._fileMapData.get(fileUri);
        if (!existInclude)
            return;
        this.remove(existInclude);
    }
    updateReferences() {
        this._fileMapData.forEach((includeData, fileUri) => {
            includeData.value.includes.forEach(includedFileUri => {
                const includedFileData = this._fileMapData.get(includedFileUri);
                if (!includedFileData)
                    return;
                includedFileData.value.referencedBy.add(fileUri);
            });
        });
    }
    getRecursiveIncludesOfUri(uri, collected) {
        const fileUri = typeof uri === "string" ? uri : getFileId(uri);
        const includeData = this._fileMapData.get(fileUri);
        collected = collected ?? new Set([fileUri]);
        if (!includeData)
            return collected;
        includeData.value.includes.forEach(includedFileUri => {
            if (collected.has(includedFileUri))
                return;
            const includedFileData = this._fileMapData.get(includedFileUri);
            if (!includedFileData)
                return;
            collected.add(includedFileUri);
            this.getRecursiveIncludesOfUri(includedFileData.uri, collected);
        });
        return collected;
    }
}
export const includeManager = new DataManager();
//# sourceMappingURL=data.js.map