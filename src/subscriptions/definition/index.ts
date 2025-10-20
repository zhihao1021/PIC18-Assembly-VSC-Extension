import {
    CancellationToken,
    DefinitionProvider,
    ExtensionContext,
    languages,
    Location,
    Position,
    ProviderResult,
    TextDocument,
} from "vscode";
import { checkLabelDefinition } from "./label";
import { checkVariableDefinition } from "./variable";
import { checkMacroDefinition } from "./macro";

const lastSpaceRegex = /(^|\s|,)[^\s,]*$/
const nextSpaceRegex = /^([^\s,]+)(?:$|\s|,)/

export class CustomDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Location[]> {
        const lineText = document.lineAt(position).text;
        const spaceMatch = lineText.slice(0, position.character + 1).match(lastSpaceRegex);
        if (!spaceMatch || spaceMatch.index === undefined) {
            return null;
        }

        const startIndex = spaceMatch.index + spaceMatch[1].length;
        const endMatch = lineText.slice(startIndex).match(nextSpaceRegex);
        if (!endMatch) {
            return null;
        }

        const word = endMatch[1];
        const locations: Location[] = [];

        checkLabelDefinition(word, lineText, startIndex, locations);
        if (locations.length > 0) return locations;

        checkMacroDefinition(word, lineText, startIndex, document, locations);
        if (locations.length > 0) return locations;

        checkVariableDefinition(
            word,
            lineText,
            startIndex,
            document,
            position,
            locations
        );

        return locations.length ? locations : null;
    }
}

export function initDefinitionProvider(context: ExtensionContext) {
    const {
        subscriptions
    } = context;

    const provider = new CustomDefinitionProvider();
    subscriptions.push(languages.registerDefinitionProvider(
        { language: "asm" },
        provider,
    ));
}
