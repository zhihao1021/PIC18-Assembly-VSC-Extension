import { workspace } from "vscode";
import { FILE_GLOBS, getWorkspaceFileUris } from "@/config";
import { scheduleWork } from "@/utils/scheduleWork";
import { removeFileVariables, scheduleIndexFileVariables, scheduleIndexWorkspaceVariables } from "@/resource/variable";
import { removeFileIncludes, scheduleIndexFileIncludes, scheduleIndexWorkspaceIncludes } from "@/resource/includes";
import { analyzeLabelsOfDocument, analyzeLabelsOfWorkspace, removeLabelsOfDocument } from "@/resource/label/analyze";
export function initFileSystemWatcher(context, callbacks) {
    const { subscriptions } = context;
    const { afterIncludeCallback } = callbacks ?? {};
    const updateWorkspaceIndex = async () => {
        const uris = await getWorkspaceFileUris();
        const documents = await Promise.all(uris.map(async (uri) => {
            return await workspace.openTextDocument(uri);
        }));
        scheduleWork("analyzeLabels", async () => {
            analyzeLabelsOfWorkspace(documents);
            await scheduleIndexWorkspaceIncludes(documents, 0, async () => {
                await scheduleIndexWorkspaceVariables(documents, 100);
                afterIncludeCallback?.();
            });
        }, 200);
    };
    updateWorkspaceIndex();
    const watcher = workspace.createFileSystemWatcher(FILE_GLOBS);
    const updateFunc = async (uri) => {
        const doc = await workspace.openTextDocument(uri);
        scheduleIndexFileIncludes(doc, 0, async () => {
            await scheduleIndexFileVariables(doc, 100);
        });
        analyzeLabelsOfDocument(doc);
        // scheduleWork("analyzeLabels", () => {
        // }, 100);
    };
    watcher.onDidCreate(updateFunc);
    watcher.onDidChange(updateFunc);
    watcher.onDidDelete(uri => {
        removeFileIncludes(uri);
        removeFileVariables(uri);
        removeLabelsOfDocument(uri);
    });
    subscriptions.push(watcher);
}
//# sourceMappingURL=fileWatcher.js.map