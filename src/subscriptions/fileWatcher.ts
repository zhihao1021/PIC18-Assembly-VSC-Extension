import { ExtensionContext, TextDocument, Uri, workspace } from "vscode";

import { FILE_GLOBS, getWorkspaceFileUris } from "@/config";
import { scheduleWork } from "@/utils/scheduleWork";

// import { removeFileVariables, scheduleIndexFileVariables, scheduleIndexWorkspaceVariables } from "@/resource/variable";
// import { removeFileIncludes, scheduleIndexFileIncludes, scheduleIndexWorkspaceIncludes } from "@/resource/includes";
import {
    analyzeLabelsOfDocument,
    analyzeLabelsOfWorkspace,
    removeLabelsOfDocument
} from "@/resource/label/analyze";
import {
    resetCompletionCache
} from "@/resource/label/completion";
import {
    semanticTokensProvider
} from "@/semantic";
import { analyzeIncludesOfDocument, analyzeIncludesOfWorkspace, removeIncludesOfDocument } from "@/resource/include/analyze";
import { analyzeVariablesOfDocument, analyzeVariablesOfWorkspace, removeVariablesOfDocument } from "@/resource/variable/analyze";
import { includeManager } from "@/resource/include/data";
import { variableManager } from "@/resource/variable/data";
import { analyzeMacrosOfWorkspace, analyzeMacrosOfDocument, removeMacrosOfDocument, analyzeMacrosUsageOfDocument } from "@/resource/macro/analyze";
import { macroManager } from "@/resource/macro/data";


export function initFileSystemWatcher(context: ExtensionContext) {
    const {
        subscriptions
    } = context;

    const updateWorkspaceIndex = async () => {
        const uris = await getWorkspaceFileUris();
        const documents: TextDocument[] = await Promise.all(uris.map(async uri => {
            return await workspace.openTextDocument(uri);
        }));

        scheduleWork("indexWorkspace", async () => {
            analyzeLabelsOfWorkspace(documents);
            analyzeIncludesOfWorkspace(documents);
            analyzeVariablesOfWorkspace(documents);
            analyzeMacrosOfWorkspace(documents);

            includeManager.addReferencesRefreshCallback((uri, document) => {
                variableManager.refreshUsageVariablesExistsOfUri(uri);
                macroManager.refreshIncludeMacrosOfUri(uri);

                if (document) {
                    analyzeMacrosUsageOfDocument(document);
                }
            });
        }, 200);

    }
    updateWorkspaceIndex();

    const watcher = workspace.createFileSystemWatcher(FILE_GLOBS);
    const updateFunc = async (uri: Uri) => {
        let doc: TextDocument;
        try { doc = await workspace.openTextDocument(uri); }
        catch { return; }

        analyzeLabelsOfDocument(doc);
        analyzeIncludesOfDocument(doc);
        analyzeVariablesOfDocument(doc);
        analyzeMacrosOfDocument(doc);
        analyzeMacrosUsageOfDocument(doc);
    }
    watcher.onDidChange(updateFunc);
    watcher.onDidDelete(uri => {
        removeLabelsOfDocument(uri);
        removeIncludesOfDocument(uri);
        removeVariablesOfDocument(uri);
        removeMacrosOfDocument(uri);

        resetCompletionCache();

        semanticTokensProvider.clearCacheForUri(uri);
    });

    subscriptions.push(watcher);
}
