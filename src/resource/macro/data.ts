import { Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { MacroResourceType } from "./types/macro";
import { includeManager } from "../include/data";

class DataManager {
    private _fileMapMacroData: Map<string, MacroResourceType[]>;
    private _fileIncludeMapMacroData: Map<string, Set<MacroResourceType>>;
    private _fileMapMacroUsageData: Map<string, MacroResourceType[]>

    get fileMapMacroData(): Map<string, MacroResourceType[]> {
        return this._fileMapMacroData;
    }

    get fileIncludeMapMacroData(): Map<string, Set<MacroResourceType>> {
        return this._fileIncludeMapMacroData;
    }

    get fileMapMacroUsageData(): Map<string, MacroResourceType[]> {
        return this._fileMapMacroUsageData;
    }

    constructor() {
        this._fileMapMacroData = new Map();
        this._fileIncludeMapMacroData = new Map();
        this._fileMapMacroUsageData = new Map();
    }

    public setMacrosOfUri(uri: Uri, macros: MacroResourceType[]): void {
        const fileUri = getFileId(uri);
        this._fileMapMacroData.set(fileUri, macros);

        this.refreshRefrenceFilesMacrosOfUri(uri);
    }

    public removeMacrosOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        this._fileMapMacroData.delete(fileUri);

        this.refreshRefrenceFilesMacrosOfUri(uri);
    }

    public refreshRefrenceFilesMacrosOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
        if (!includeFiles) return;

        includeFiles.forEach(includeUri => this.refreshIncludeMacrosOfUri(Uri.parse(includeUri)));
    }

    public refreshIncludeMacrosOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        const macros = this._fileMapMacroData.get(fileUri);
        if (!macros) return;

        const includedFiles = includeManager.recursiveIncludeMapData.get(fileUri);
        if (!includedFiles) return;
        const macrosList = this._fileIncludeMapMacroData.set(fileUri, new Set()).get(fileUri)!;
        const addedFiles = new Set<string>();

        includedFiles.forEach(includeUri => {
            if (addedFiles.has(includeUri)) return;
            addedFiles.add(includeUri);

            const includeMacros = this._fileMapMacroData.get(includeUri);
            if (!includeMacros) return;

            includeMacros.forEach(macro => macrosList.add(macro));
        });
    }

    public setMacroUsageOfUri(uri: Uri, macros: MacroResourceType[]): void {
        const fileUri = getFileId(uri);
        this._fileMapMacroUsageData.set(fileUri, macros);
    }

    public removeMacroUsageOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        this._fileMapMacroUsageData.delete(fileUri);
    }
}

export const macroManager = new DataManager();
