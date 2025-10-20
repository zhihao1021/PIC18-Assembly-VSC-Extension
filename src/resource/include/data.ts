import { TextDocument, Uri } from "vscode";

import { getFileId } from "@/utils/getFileId";

import { IncludeDataType, IncludeResourceType } from "./types/include";

class DataManager {
    private _fileMapData: Map<string, IncludeResourceType>;
    private _recursiveIncludeMapData: Map<string, Set<string>>;
    private _referencesCallbacks: Set<(uri: Uri, document: TextDocument | null) => void>;
    private _documentCache: TextDocument | null;

    get fileMapData(): Map<string, IncludeResourceType> {
        return this._fileMapData;
    }

    get recursiveIncludeMapData(): Map<string, Set<string>> {
        return this._recursiveIncludeMapData;
    }

    set documentCache(document: TextDocument) {
        this._documentCache = document;
    }

    constructor() {
        this._fileMapData = new Map();
        this._recursiveIncludeMapData = new Map();
        this._referencesCallbacks = new Set();
        this._documentCache = null;
    }

    private referenceRefresh(modifyInclude: IncludeResourceType): void {
        const uris = Array.from(modifyInclude.value.referencedBy).map(uri => {
            const includeData = this._fileMapData.get(uri);
            return includeData && includeData.uri;
        }).filter(uri => uri !== undefined);

        if (this._fileMapData.has(getFileId(modifyInclude.uri))) {
            uris.push(modifyInclude.uri);
        }

        uris.forEach(uri => this._referencesCallbacks.forEach(
            callback => callback(uri, this.documentCache)
        ));
    }

    public addReferencesRefreshCallback(callback: (uri: Uri, document: TextDocument | null) => void): void {
        this._referencesCallbacks.add(callback);
    }

    private push(include: IncludeResourceType): void {
        const fileUri = getFileId(include.uri);

        this._fileMapData.set(fileUri, include);
        include.value.includes.forEach(includedFileUri => {
            const includedFileData = this._fileMapData.get(includedFileUri);
            if (!includedFileData) return;

            includedFileData.value.referencedBy.add(fileUri);
        });

        // Update recursive includes relationships
        this._recursiveIncludeMapData.set(
            fileUri,
            this.getRecursiveIncludesOfUri(include.uri)
        );
        include.value.referencedBy.forEach(referencingFileUri => {
            const referencingIncludeData = this._fileMapData.get(referencingFileUri);
            if (!referencingIncludeData) return;

            this._recursiveIncludeMapData.set(
                referencingFileUri,
                this.getRecursiveIncludesOfUri(referencingIncludeData.uri)
            );
        });

        this.referenceRefresh(include);
    }

    private remove(include: IncludeResourceType): void {
        const fileUri = getFileId(include.uri);

        const includeData = this._fileMapData.get(fileUri);
        if (!includeData) return;

        this._fileMapData.delete(fileUri);
        includeData.value.includes.forEach(includedFileUri => {
            const includedFileData = this._fileMapData.get(includedFileUri);
            if (!includedFileData) return;

            includedFileData.value.referencedBy.delete(fileUri);
        });

        this._recursiveIncludeMapData.delete(fileUri);
        includeData.value.referencedBy.forEach(referencingFileUri => {
            const referencingIncludeData = this._fileMapData.get(referencingFileUri);
            if (!referencingIncludeData) return;

            referencingIncludeData.value.includes.delete(fileUri);
            this._recursiveIncludeMapData.set(
                referencingFileUri,
                this.getRecursiveIncludesOfUri(referencingIncludeData.uri)
            );
        });

        this.referenceRefresh(include);
    }

    public clear(): void {
        this._fileMapData.clear();
    }

    public setIncludeOfUri(uri: Uri, include: IncludeResourceType): void {
        const fileUri = getFileId(uri);
        const oldIncludeData = this._fileMapData.get(fileUri);

        if (oldIncludeData) {
            include.value.referencedBy = oldIncludeData.value.referencedBy;

            [...oldIncludeData.value.includes].filter(x => !include.value.includes.has(x)).forEach(includedFileUri => {
                const includedFileData = this._fileMapData.get(includedFileUri);
                if (!includedFileData) return;
                includedFileData.value.referencedBy.delete(fileUri);
            });
        }

        this.push(include);
    }

    public removeIncludeOfUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        const existInclude = this._fileMapData.get(fileUri);
        if (!existInclude) return;

        this.remove(existInclude);
    }

    public updateReferences(): void {
        this._fileMapData.forEach((includeData, fileUri) => {
            includeData.value.includes.forEach(includedFileUri => {
                const includedFileData = this._fileMapData.get(includedFileUri);
                if (!includedFileData) return;
                includedFileData.value.referencedBy.add(fileUri);
            });
        });

        this._fileMapData.forEach((includeData, fileUri) => {
            const recursiveIncludes = this.getRecursiveIncludesOfUri(includeData.uri);
            this._recursiveIncludeMapData.set(fileUri, recursiveIncludes);
        });
    }

    private getRecursiveIncludesOfUri(uri: Uri, results?: Set<string>): Set<string> {
        const fileUri = getFileId(uri);
        if (results === undefined) results = new Set([fileUri]);

        const includeData = this._fileMapData.get(fileUri);
        if (!includeData) return results;

        includeData.value.includes.forEach(fileUri => {
            if (results.has(fileUri)) return;
            results.add(fileUri);

            const includeData = this._fileMapData.get(fileUri);
            if (!includeData) return;

            this.getRecursiveIncludesOfUri(includeData.uri, results);
        });

        return results;
    }
}

export const includeManager = new DataManager();
