import { Position } from "vscode";

export const lastSpaceRegex = /(^|\s|,)[^\s,]*$/
export const nextSpaceRegex = /^([^\s,]+)(?:$|\s|,)/

export function parseWordAtPosition(
    lineText: string,
    position: Position
): {
    word: string;
    startIndex: number;
} | undefined {
    const spaceMatch = lineText.slice(0, position.character + 1).match(lastSpaceRegex);
    if (!spaceMatch || spaceMatch.index === undefined) return;

    const startIndex = spaceMatch.index + spaceMatch[1].length;
    const endMatch = lineText.slice(startIndex).match(nextSpaceRegex);
    if (!endMatch) return;

    const word = endMatch[1];
    if (!word) return;

    return {
        word,
        startIndex
    }
}
