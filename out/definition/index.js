import { languages, } from "vscode";
import { checkLabelDefinition } from "./label";
import { checkVariableDefinition } from "./variable";
const lastSpaceRegex = /(^|\s|,)[^\s,]*$/;
const nextSpaceRegex = /^([^\s,]+)(?:$|\s|,)/;
export class CustomDefinitionProvider {
    provideDefinition(document, position, token) {
        const lineText = document.lineAt(position).text;
        const spaceMatch = lineText.slice(0, position.character + 1).match(lastSpaceRegex);
        if (!spaceMatch || !spaceMatch.index) {
            return null;
        }
        const startIndex = spaceMatch.index + spaceMatch[1].length;
        const endMatch = lineText.slice(startIndex).match(nextSpaceRegex);
        if (!endMatch) {
            return null;
        }
        const word = endMatch[1];
        const locations = [];
        checkLabelDefinition(word, lineText, startIndex, locations);
        if (locations.length > 0) {
            return locations;
        }
        checkVariableDefinition(word, lineText, startIndex, document, locations);
        return locations.length ? locations : null;
    }
}
export function initDefinitionProvider(context) {
    const { subscriptions } = context;
    const provider = new CustomDefinitionProvider();
    subscriptions.push(languages.registerDefinitionProvider({ language: "asm" }, provider));
}
//# sourceMappingURL=index.js.map