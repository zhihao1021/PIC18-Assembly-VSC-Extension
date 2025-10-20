import { Uri, workspace } from "vscode";

const DEFAULT_EXCLUDE_FILES = [
    "**/node_modules/**",
    "**/build/**",
    "**/.vscode/**",
    "**/.git/**",
    "**/.history/**",
    "**/nbproject/**",
    "**/dist/**",
    "**/debug/**",
    "**/_build/**",
    "**/cmake/**",
    "**/out/**",
];

export const EXCLUDE_FILES = DEFAULT_EXCLUDE_FILES;

export const FILE_GLOBS = `**/*.{asm,as,s,inc}`;

let gitIgnorePatterns: string[] | undefined;

export async function updateGitIgnorePatterns(): Promise<void> {
    const gitIgnoreFile = Uri.joinPath(workspace.workspaceFolders?.[0].uri || Uri.file("."), ".gitignore");
    try {
        const gitIgnoreDoc = await workspace.openTextDocument(gitIgnoreFile);
        gitIgnorePatterns = gitIgnoreDoc.getText()
            .split("\n")
            .map(line => line.trim())
            .filter(line => line && !line.startsWith("#"));
    } catch {
        if (gitIgnorePatterns === undefined) gitIgnorePatterns = [];
    }
}

export async function getWorkspaceFileUris(): Promise<Uri[]> {
    if (gitIgnorePatterns === undefined) await updateGitIgnorePatterns();

    return await workspace.findFiles(
        FILE_GLOBS,
        `{${[...EXCLUDE_FILES, ...gitIgnorePatterns!].join(",")}}`
    );
}
