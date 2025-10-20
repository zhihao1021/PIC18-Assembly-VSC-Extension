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

import { parseWordAtPosition } from "@/utils/parseWord";

import { checkLabelDefinition } from "./label";
import { checkVariableDefinition } from "./variable";
import { checkMacroDefinition } from "./macro";

export class CustomDefinitionProvider implements DefinitionProvider {
    public provideDefinition(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<Location[]> {
        const lineText = document.lineAt(position).text;
        const parseWord = parseWordAtPosition(lineText, position);
        if (!parseWord) return null;
        const { word, startIndex } = parseWord;

        const locations: Location[] = [];

        checkLabelDefinition(
            word,
            lineText,
            startIndex,
            document,
            position,
            locations
        );
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
