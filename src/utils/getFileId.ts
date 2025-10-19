import { Uri, workspace } from "vscode";

export function getFileId(uri: Uri) {
    return workspace.asRelativePath(uri, false).toLowerCase();
}