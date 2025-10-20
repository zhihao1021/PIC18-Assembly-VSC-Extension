import { CompletionItem, CompletionItemKind } from "vscode";

export type Xc8PreProcessor = {
    label: string;
    detail: string;
};

export const XC8_PREPROCESSOR: Xc8PreProcessor[] = [
    { label: "#define", detail: "Define preprocessor macro." },
    { label: "#elif", detail: "Short for #else #if." },
    { label: "#else", detail: "Conditionally include source lines." },
    { label: "#endif", detail: "Terminate conditional source inclusion." },
    { label: "#error", detail: "Generate an error message." },
    { label: "#if", detail: "Include source lines if constant expression true." },
    { label: "#ifdef", detail: "Include source lines if preprocessor symbol defined." },
    { label: "#ifndef", detail: "Include source lines if preprocessor symbol not defined." },
    { label: "#include", detail: "Include text file into source." },
    { label: "#line", detail: "Specify line number and filename for listing." },
    { label: "#undef", detail: "Undefines preprocessor symbol." },
    { label: "#warning", detail: "Generate a warning message." },
]

export const XC8_PREPROCESSOR_COMPLETIONS = XC8_PREPROCESSOR.map(({ label, detail }) => {
    const ci = new CompletionItem(label, CompletionItemKind.Keyword);
    ci.detail = detail;
    ci.insertText = `${label.slice(1)} `;
    return ci;
})
