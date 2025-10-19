import { Uri, workspace } from "vscode";

const DEFAULT_EXCLUDE_FILES = [
    "**/node_modules/**",
    "**/build/**",
    "**/.vscode/**",
    "**/.git/**",
    "**/nbproject/**",
    "**/dist/**",
    "**/debug/**",
    "**/_build/**",
    "**/cmake/**",
    "**/out/**",
];

export const EXCLUDE_FILES = DEFAULT_EXCLUDE_FILES;

export const FILE_GLOBS = `**/*.{asm,as,s,inc}`;

export async function getWorkspaceFileUris(): Promise<Uri[]> {
    return await workspace.findFiles(
        FILE_GLOBS,
        `{${EXCLUDE_FILES.join(",")}}`
    );
}
