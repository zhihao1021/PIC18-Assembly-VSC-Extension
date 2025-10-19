import { CompletionItem, CompletionItemKind, MarkdownString } from "vscode";
import differenceDefine from "./define/difference.json";
import sameDefine from "./define/same.json";
import mpasmDefine from "./define/mpasm.json";
import xc8Define from "./define/xc8.json";
export const PIC_DEFINE_COMPLETIONS = [
    ...Object.entries(sameDefine).map(([label, value]) => {
        const ci = new CompletionItem(label, CompletionItemKind.Constant);
        ci.detail = value;
        ci.insertText = label;
        ci.documentation = new MarkdownString(`#### ${label}\nSame value in both assemblers.\n\n\`${value}\``);
        return ci;
    }),
    ...Object.entries(differenceDefine).map(([label, value]) => {
        const ci = new CompletionItem(label, CompletionItemKind.Constant);
        ci.detail = `(different) ${value.xc8} or ${value.mpasm}`;
        ci.insertText = label;
        ci.documentation = new MarkdownString(`#### ${label}\nDifferent value depending on the assembler.\n\n- MPASM: \`${value.mpasm}\`\n- XC8: \`${value.xc8}\``);
        return ci;
    }),
    ...Object.entries(mpasmDefine).map(([label, value]) => {
        const ci = new CompletionItem(label, CompletionItemKind.Constant);
        ci.detail = `(mpasm) ${value}`;
        ci.insertText = label;
        ci.documentation = new MarkdownString(`#### ${label}\nOnly defined in MPASM.\n\n\`${value}\``);
        return ci;
    }),
    ...Object.entries(xc8Define).map(([label, value]) => {
        const ci = new CompletionItem(label, CompletionItemKind.Constant);
        ci.detail = `(xc8) ${value}`;
        ci.insertText = label;
        ci.documentation = new MarkdownString(`#### ${label}\nOnly defined in XC8.\n\n\`${value}\``);
        return ci;
    }),
];
export const PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT = PIC_DEFINE_COMPLETIONS.map(ci => {
    ci.sortText = `zzz${ci.label}`;
    return ci;
});
//# sourceMappingURL=define.js.map