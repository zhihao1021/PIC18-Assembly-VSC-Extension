# pic18-assembly-language

提供 PIC18 組合語言（asm）在 Visual Studio Code 中的 IntelliSense 與開發輔助。

此擴充套件針對副檔名 `.asm`, `.s`, `.as`（語言 id: `asm` / `PIC18 assembly`）的檔案提供自動補全與多項進階功能，方便撰寫 PIC18 Assembly 程式。

## 主要功能

- 指令自動完成：內建常用 PIC18 指令與參數提示（例如 MOV, GOTO, CALL 等）。
- Label 智能補全：在像 GOTO / CALL 等指令後會列出 workspace 中的 labels（顯示來源檔案）。
- 自動加入 EXTRN：當從其他檔案補全 label 且目前檔案尚未宣告 EXTRN 時，選擇補全將自動在檔案頂部插入 `EXTRN <label>`（可自動或提示插入）。
- 跨檔案索引：監聽 workspace 檔案變化並建立 label 索引，效能優化（debounce、排除資料夾支援）。
- 跳至定義（Go to Definition）：Ctrl+Click / F12 可以跳到 label 的定義位置。
- 語意標記（Semantic tokens）：將 label 標示為 function 類型以套用主題的 function 顏色。
- 衝突檢測（Diagnostics）：若偵測到同名 label 重複定義，會產生 diagnostics（紅色波浪線）提醒。

## 安裝

開發中或本機測試：

1. 在本機打開此專案資料夾（VS Code）。
2. 安裝相依（Node.js 與 npm 必須已安裝）：

```powershell
npm install
```

3. 如果你要產生 distributable 的 VSIX（單一檔案發佈包），會用到 `esbuild` 與 `vsce`：

```powershell
npm run bundle   # 使用 esbuild 產生 out/extension.js
npx vsce package # 產生 .vsix
```

（注意：`package.json` 需包含有效的 `publisher`, `name`, `version`, `engines.vscode`，否則 `vsce package` 會失敗。）

## 開發 / 在本機測試

1. 開啟此資料夾於 VS Code，按 F5 執行「Run Extension」以開啟 Extension Development Host。
2. 在新的 Extension Host 視窗建立 `test.asm`，或在既有的 asm 檔案中測試。
3. 嘗試輸入 `MOV`, `GOTO` 或 `CALL`，按 `Ctrl+Space` 觸發補全。若補全列出跨檔 label，選擇某個 label 將自動在目前檔案插入 `EXTRN <label>`（若尚未有）。

建議步驟（檢查）:

- 若沒有看到補全，打開「View → Debug Console」檢查開發主機的錯誤。
- 檢查 `out/extension.js` 是否存在（在以 TypeScript 開發時，需先執行 `npm run bundle` 產出單一 JS）。

## 打包發佈（產生 VSIX）

1. 確認 `package.json` 的以下欄位存在並正確：`publisher`, `name`, `version`, `engines.vscode`。
2. 安裝相依：`npm install`。
3. 產生 bundle（esbuild）：`npm run bundle`。輸出為 `out/extension.js`。
4. 使用 vsce 建立 VSIX：`npx vsce package`。
5. 成功後會在專案根目錄得到 `your-extension-name-x.y.z.vsix` 檔案，可在 VS Code 使用「Extensions: Install from VSIX...」安裝。

注意事項：

- 若 `npx vsce package` 出錯，請檢查 `package.json` 中 `publisher` 是否為合法的發行者名稱，並確認沒有缺少必要欄位（例如 `displayName`, `engines.vscode`）。
- 若出現 alias import（像 `@/`）相關錯誤，確保先執行 `npm run bundle` 由 esbuild 將 TypeScript 打包成單一 `out/extension.js`。

## 可配置選項（若有）

目前此擴充套件沒有提供額外的使用者設定（`contributes.configuration`）。未來可以加入如 `pic18asm.enable`，`pic18asm.excludeGlobs` 等選項以控制索引範圍與功能開關。

## 已實作的進階功能（概要）

- Workspace label 索引與排除規則（支持排除多個資料夾或檔案）。
- Label 補全會顯示來源檔案路徑，並在必要時自動新增 `EXTRN`。 
- Label 定義的語意著色與 Ctrl+Click 跳轉。 
- label 名稱衝突檢測並以 Diagnostics 顯示。

## 常見問題（FAQ）

Q: 為什麼補全沒有顯示跨檔 label？

A: 請確認你的工作區有儲存過目標檔案且 extension 的索引已完成；可嘗試重新啟動 Extension Host（F5）或在專案根目錄執行 `npm run bundle`（若使用 TypeScript 並且未產生 `out/extension.js`）。

Q: 如何讓打包後單一檔案支援 `@/` 這類匯入別名？

A: 專案已內建 `scripts/build.js`（利用 esbuild + alias plugin）在 `npm run bundle` 時解析 `@` 到 `src/`，打包結果會生成 `out/extension.js`，確保先執行 `npm install` 再 `npm run bundle`。

## 貢獻

歡迎 PR、Issue 與 feature request。若要貢獻請先建立 issue 描述功能或 bug，再開 PR。保持小步提交與具體說明有助於更快合併。

## 授權

請在此處加入授權資訊（例如 MIT License）。

---

如果你要我現在代為在這個工作區執行 `npm install`、`npm run bundle` 與 `npx vsce package` 並回報輸出，我可以執行（需要你允許我在終端跑指令）；或是我可以只提供在 Windows PowerShell 下的逐步命令與疑難排解清單，交由你執行。

完成：更新 README，包含本機開發、測試與打包流程說明。
