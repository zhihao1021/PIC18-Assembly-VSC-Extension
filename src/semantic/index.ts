import {
    CancellationToken,
    DocumentSemanticTokensProvider,
    ExtensionContext,
    Event,
    EventEmitter,
    languages,
    ProviderResult,
    SemanticTokens,
    SemanticTokensBuilder,
    SemanticTokensLegend,
    TextDocument,
    Range,
    Uri,
} from "vscode";

import { getLabelRanges } from "./module/label";
import { getVariableRanges } from "./module/variable";
import { getFileId } from "@/utils/getFileId";
import { LRUCache } from "lru-cache";
import { getMacroRanges } from "./module/macro";

type DispatcherType = "label" | "variable" | "macro";
const dispatcherTypeMap: { [key in DispatcherType]: string } = {
    label: "function",
    variable: "variable",
    macro: "class",
};
const allDispatchers = new Set(Object.keys(dispatcherTypeMap) as DispatcherType[]);

// Limit cached resources to avoid unbounded memory growth. Keep a modest max entries.
const cachedResources: LRUCache<string, Map<DispatcherType, [Range, string][]>> = new LRUCache({ max: 200 });
const funcMap: { [key in DispatcherType]: (document: TextDocument) => Range[] } = {
    label: getLabelRanges,
    variable: getVariableRanges,
    macro: getMacroRanges,
};

export class CustomSemanticProvider implements DocumentSemanticTokensProvider {
    private _onDidChange = new EventEmitter<void>();
    private dispatchers: Set<DispatcherType> = new Set();

    public readonly onDidChangeSemanticTokens: Event<void> = this._onDidChange.event;

    public provideDocumentSemanticTokens(
        document: TextDocument,
        token: CancellationToken
    ): ProviderResult<SemanticTokens> {
        const fileUri = getFileId(document.uri);
        const builder = new SemanticTokensBuilder(legend);
        const dispatchers = this.dispatchers.size === 0 ? allDispatchers : this.dispatchers;

        let cacheMap = cachedResources.get(fileUri);
        if (!cacheMap) {
            cacheMap = new Map<DispatcherType, [Range, string][]>();
            cachedResources.set(fileUri, cacheMap);
        }
        const results: [Range, string][] = [];
        for (const dispatcher of allDispatchers) {
            if (dispatchers.has(dispatcher) || !cacheMap.has(dispatcher)) {
                const rangePairs = funcMap[dispatcher](document).map(r => [r, dispatcherTypeMap[dispatcher]] as [Range, string]);
                cacheMap.set(dispatcher, rangePairs);

                results.push(...rangePairs);
            }
            else {
                results.push(...cacheMap.get(dispatcher)!);
            }
        }

        results.forEach(r => builder.push(...r));
        this.dispatchers.clear();

        return builder.build();
    }

    public addDispatcher(dispatcher: DispatcherType) {
        this.dispatchers.add(dispatcher);
    }

    public refresh(): void {
        this._onDidChange.fire();
    }

    public clearCacheForUri(uri: Uri): void {
        const fileUri = getFileId(uri);
        cachedResources.delete(fileUri);
    }
}

const legend = new SemanticTokensLegend(["function", "variable", "class"], []);
const provider = new CustomSemanticProvider();

export function initSemanticProvider(context: ExtensionContext) {
    const {
        subscriptions
    } = context;

    subscriptions.push(languages.registerDocumentSemanticTokensProvider(
        { language: "asm" },
        provider,
        legend
    ));
}

export function refreshSemanticTokensFuncGenerator(dispatchor: DispatcherType): () => void {
    provider.addDispatcher(dispatchor);

    return () => provider.refresh();
}

export const semanticTokensProvider = provider;
