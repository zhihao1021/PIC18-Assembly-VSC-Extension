import { workspace } from "vscode";
export function getFileId(uri) {
    return workspace.asRelativePath(uri, false).toLowerCase();
}
//# sourceMappingURL=getFileId.js.map