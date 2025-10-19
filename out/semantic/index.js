import { EventEmitter, languages, SemanticTokensBuilder, SemanticTokensLegend, } from "vscode";
import { pushLabelRanges } from "./module/label";
import { pushVariableRanges } from "./module/variable";
export class CustomSemanticProvider {
    constructor() {
        this._onDidChange = new EventEmitter();
        this.onDidChangeSemanticTokens = this._onDidChange.event;
    }
    provideDocumentSemanticTokens(document, token) {
        const builder = new SemanticTokensBuilder(legend);
        pushLabelRanges(document, builder);
        pushVariableRanges(document, builder);
        return builder.build();
    }
    refresh() {
        this._onDidChange.fire();
    }
}
const legend = new SemanticTokensLegend(["function", "variable"], []);
const provider = new CustomSemanticProvider();
export function initSemanticProvider(context) {
    const { subscriptions } = context;
    subscriptions.push(languages.registerDocumentSemanticTokensProvider({ language: "asm" }, provider, legend));
}
export function refreshSemanticTokens() {
    provider.refresh();
}
//# sourceMappingURL=index.js.map