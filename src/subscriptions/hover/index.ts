import { ExtensionContext, Hover, languages, Position, TextDocument } from "vscode";

import { instructionRegex } from "@/pic18/instructions";
import { INSTRUCTION_DETAILS_MAP } from "@/pic18/instruction_detail";
import { InstructionKey } from "@/pic18/type";
import { labelBehindBranchRegex } from "@/resource/label/analyze";
import { parseWordAtPosition } from "@/utils/parseWord";
import { labelManager } from "@/resource/label/data";
import { includeManager } from "@/resource/include/data";
import { getFileId } from "@/utils/getFileId";
import { labelToDocumentation } from "@/resource/label/documentation";
import { usageVariableRegex } from "@/resource/variable/usageVariableRegex";
import { variableManager } from "@/resource/variable/data";
import { variableToDocumentation } from "@/resource/variable/documentation";
import { VariableDefineResourceType } from "@/resource/variable/types/variableDefine";
import { macroManager } from "@/resource/macro/data";
import { macroToDocumentation } from "@/resource/macro/documentation";

const instRegex = new RegExp(instructionRegex, "i");
const labelBehindBraRegex = new RegExp(labelBehindBranchRegex, "i");

function provideHover(document: TextDocument, position: Position): Hover | undefined {
    const fileUri = getFileId(document.uri);
    const lineText = document.lineAt(position).text;
    const parseWord = parseWordAtPosition(lineText, position);
    if (!parseWord) return;

    const { word, startIndex } = parseWord;

    const instructionMatch = lineText.match(instRegex);
    if (instructionMatch && instructionMatch.index !== undefined && startIndex === instructionMatch.index + instructionMatch[0].indexOf(instructionMatch[1])) {
        const wordKey = word.startsWith("TBL") ? word.slice(0, 5) : word;
        const instructionDetail = INSTRUCTION_DETAILS_MAP.get(wordKey as InstructionKey);
        if (instructionDetail) return new Hover(instructionDetail);
    }

    const labelMatch = lineText.match(labelBehindBraRegex);
    if (labelMatch && labelMatch.index !== undefined && startIndex === labelMatch.index + labelMatch[0].indexOf(labelMatch[1])) {
        const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
        const labelData = labelManager.labelNameMapData.get(word);

        if (includeFiles && labelData) {
            const label = labelData.find(l => includeFiles.has(getFileId(l.uri)));
            if (label) return new Hover(labelToDocumentation(label));
        }
    }

    const targetVariable = variableManager.fileMapUsageData.get(fileUri)?.get(word)?.find(({ range, value: { exists, macro } }) => range.contains(position) && (exists || macro));
    if (targetVariable) {
        if (targetVariable.value.macro) {
            const macroData = targetVariable.value.macro;
            const param = macroData.value.parameters.get(word)?.[0];
            if (param) return new Hover(variableToDocumentation(param, macroData));
        }
        else {
            const includeFiles = Array.from(includeManager.recursiveIncludeMapData.get(fileUri)?.keys() ?? []);
            const variableDefines = includeFiles.map(
                uri => variableManager.fileMapDefineData.get(uri)?.get(word)
            ).find(v => v && v.value.name === word);
            if (variableDefines) return new Hover(variableToDocumentation(variableDefines));
        }
    }

    const targetMarco = Array.from(macroManager.fileIncludeMapMacroData.get(fileUri)?.keys() ?? []).find(({ value: { name } }) => name === word);
    if (targetMarco) return new Hover(macroToDocumentation(targetMarco));
}

export function initHoverProvider(context: ExtensionContext) {
    const provider = languages.registerHoverProvider({ language: "asm" }, {
        provideHover
    });

    context.subscriptions.push(provider);
}
