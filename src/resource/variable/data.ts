import { Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { VariableDefineResourceType } from "./types/variableDefine";
import { VariableResourceType } from "./types/variable";
import { includeManager } from "../include/data";

class DataManager {
    private _fileMapDefineData: Map<string, Map<string, VariableDefineResourceType>>;
    private _fileMapUsageData: Map<string, Map<string, VariableResourceType[]>>;

    get fileMapDefineData(): Map<string, Map<string, VariableDefineResourceType>> {
        return this._fileMapDefineData;
    }

    get fileMapUsageData(): Map<string, Map<string, VariableResourceType[]>> {
        return this._fileMapUsageData;
    }

    constructor() {
        this._fileMapDefineData = new Map();
        this._fileMapUsageData = new Map();
    }

    private push(variable: VariableDefineResourceType): void {
        const { uri, value: { name } } = variable;
        const fileUri = getFileId(uri);

        const nameMap = this._fileMapDefineData.get(fileUri) ?? this._fileMapDefineData.set(fileUri, new Map()).get(fileUri);
        nameMap!.set(name, variable);
    }

    public clear(): void {
        this._fileMapDefineData.clear();
    }

    public setDefineVariablesOfUri(uri: Uri, variables: VariableDefineResourceType[]): void {
        if (variables.length === 0) {
            this.removeDefineVariablesOfUri(uri);
            return;
        }

        variables.forEach(variable => this.push(variable));
    }

    public removeDefineVariablesOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);

        this._fileMapDefineData.delete(fileUri);
    }

    public setUsageVariablesOfUri(uri: Uri, variables: VariableResourceType[]): void {
        const fileUri = getFileId(uri);

        const variableMap = new Map<string, VariableResourceType[]>();
        variables.forEach(v => {
            const varList = variableMap.get(v.value.name);

            if (varList) varList.push(v);
            else variableMap.set(v.value.name, [v]);
        });

        this._fileMapUsageData.set(fileUri, variableMap);
        this.refreshUsageVariablesExistsOfUri(uri);
    }

    public removeUsageVariablesOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);

        this._fileMapUsageData.delete(fileUri);
    }

    public refreshUsageVariablesExistsOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);

        const variableMap = this._fileMapUsageData.get(fileUri);
        if (!variableMap) return;

        const includedVariables: VariableDefineResourceType[] = [];
        includeManager.recursiveIncludeMapData.get(fileUri)?.forEach(includeUri => {
            const variables = this._fileMapDefineData.get(includeUri);

            if (variables) includedVariables.push(...Array.from(variables.values()));
        });

        variableMap.forEach(variables => variables.map(variable => {
            variable.value.exists = includedVariables.some(v => v.value.name === variable.value.name);
        }));
    }

    public refreshAllUsageVariablesExists(): void {
        this._fileMapUsageData.forEach((data, fileUri) => {
            if (data.size === 0) return;
            this.refreshUsageVariablesExistsOfUri(Uri.parse(fileUri));
        });
    }
}

export const variableManager = new DataManager();
