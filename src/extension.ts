import { ExtensionContext } from "vscode";

import { initAutoCompletionProvider } from "@/subscriptions/autoComplete";
import { initFileSystemWatcher } from "@/subscriptions/fileWatcher";
import { initSemanticProvider } from "./semantic/index";
import { initDefinitionProvider } from "./definition";

export function activate(context: ExtensionContext) {
    initAutoCompletionProvider(context);
    initFileSystemWatcher(context);
    initDefinitionProvider(context);
    initSemanticProvider(context);
}

export function deactivate() { }
