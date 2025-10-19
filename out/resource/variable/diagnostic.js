import { languages } from "vscode";
// Minimal variable diagnostics implementation.
// Currently we only maintain an empty diagnostic collection for variables to avoid
// duplicate/incorrect logic. This prevents TypeScript errors and can be extended
// later to add real variable diagnostics (undefined, duplicate, etc.).
const variableCollections = languages.createDiagnosticCollection("pic18-asm-variables");
export function updateVariableDiagnostics() {
    // Clear any existing diagnostics for variables.
    variableCollections.clear();
}
export function clearVariableDiagnostics() {
    variableCollections.clear();
}
//# sourceMappingURL=diagnostic.js.map