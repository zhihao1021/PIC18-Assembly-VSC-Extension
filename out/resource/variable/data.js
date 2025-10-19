import { Uri } from "vscode";
import { getFileId } from "@/utils/getFileId";
import { includeManager } from "../include/data";
class DataManager {
    get fileMapData() {
        return this._fileMapDefineData;
    }
    constructor() {
        this._fileMapDefineData = new Map();
        this._fileMapUsageData = new Map();
    }
    push(variable) {
        const { uri, value: { name } } = variable;
        const fileUri = getFileId(uri);
        const nameMap = this._fileMapDefineData.get(fileUri) ?? this._fileMapDefineData.set(fileUri, new Map()).get(fileUri);
        nameMap.set(name, variable);
    }
    clear() {
        this._fileMapDefineData.clear();
    }
    setDefineVariablesOfUri(uri, variables) {
        if (variables.length === 0) {
            this.removeDefineVariablesOfUri(uri);
            return;
        }
        variables.forEach(variable => this.push(variable));
    }
    removeDefineVariablesOfUri(uri) {
        const fileUri = getFileId(uri);
        this._fileMapDefineData.delete(fileUri);
    }
    setUsageVariablesOfUri(uri, variables) {
        const fileUri = getFileId(uri);
        this._fileMapUsageData.set(fileUri, variables);
        this.refreshUsageVariablesExistsOfUri(uri);
    }
    refreshUsageVariablesExistsOfUri(uri) {
        const fileUri = typeof uri === "string" ? uri : getFileId(uri);
        const variables = this._fileMapUsageData.get(fileUri);
        if (!variables)
            return;
        const includedVariables = [];
        includeManager.getRecursiveIncludesOfUri(uri).forEach(includeUri => {
            const variables = this._fileMapDefineData.get(includeUri);
            if (variables)
                includedVariables.push(...Array.from(variables.values()));
        });
        variables.forEach(variable => {
            variable.value.exist = includedVariables.some(v => v.value.name === variable.value.name);
        });
    }
    refreshAllUsageVariablesExists() {
        this._fileMapUsageData.forEach((_, fileUri) => {
            this.refreshUsageVariablesExistsOfUri(Uri.parse(fileUri));
        });
    }
}
export const variableManager = new DataManager();
//# sourceMappingURL=data.js.map