"use strict";
// import * as vscode from 'vscode';
// import * as path from 'path';
// import { labelData } from '@/resource/label';
// const BRANCH_RE = /\b(CALL|RCALL|GOTO|BRA|BC|BN|BNZ|BZ)\s+([A-Za-z0-9_.\$-]+)/gi;
// export function activateLabelFeatures(context: vscode.ExtensionContext) {
//     // Definition provider
//     const defProvider: vscode.DefinitionProvider = {
//         async provideDefinition(document, position, token) {
//             console.log("Position", position);
//             console.log("Position slice", document.lineAt(position).text.slice(0, position.character));
//             console.log("Position slice full", document.lineAt(position).text);
//             const wordRange = document.getWordRangeAtPosition(position, /[A-Za-z0-9_.\$-]+/);
//             if (!wordRange) return null;
//             const word = document.getText(wordRange);
//             // search label index
//             const entries = [...labelData.entries()]; // [fileUriRelative, labels[]]
//             const locations: vscode.Location[] = [];
//             const workspaceFolders = vscode.workspace.workspaceFolders || [];
//             for (const [fileRel, labels] of entries) {
//                 if (labels.includes(word)) {
//                     // resolve full uri for relative path
//                     for (const wf of workspaceFolders) {
//                         const candidate = vscode.Uri.file(path.join(wf.uri.fsPath, fileRel));
//                         try {
//                             const doc = await vscode.workspace.openTextDocument(candidate);
//                             const regex = new RegExp('^[\\t ]*' + word.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\s*:', 'm');
//                             const m = regex.exec(doc.getText());
//                             if (m) {
//                                 const idx = m.index + m[0].search(word);
//                                 const pos = doc.positionAt(idx);
//                                 locations.push(new vscode.Location(candidate, pos));
//                             }
//                         } catch (err) {
//                             // ignore open failures
//                         }
//                     }
//                 }
//             }
//             return locations.length ? locations : null;
//         }
//     };
//     context.subscriptions.push(vscode.languages.registerDefinitionProvider({ language: 'asm' }, defProvider));
// }
// export default activateLabelFeatures;
//# sourceMappingURL=labelFeatures.js.map