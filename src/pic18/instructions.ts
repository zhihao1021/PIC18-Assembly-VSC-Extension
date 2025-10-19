import { CompletionItem, CompletionItemKind, MarkdownString } from "vscode";
import { INSTRUCTION_DETAILS_MAP } from "./instruction_detail";
import { InstructionKey } from "./type";

export type PicInstruction = {
    label: string;
    detail: string;
};

export const PIC_INSTRUCTIONS: PicInstruction[] = [
    { label: "ADDWF", detail: "Add WREG and f" },
    { label: "ADDWFC", detail: "Add WREG and Carry bit to f" },
    { label: "ANDWF", detail: "AND WREG with f" },
    { label: "CLRF", detail: "Clear f" },
    { label: "COMF", detail: "Complement f" },
    { label: "CPFSEQ", detail: "Compare f with WREG, Skip =" },
    { label: "CPFSGT", detail: "Compare f with WREG, Skip >" },
    { label: "CPFSLT", detail: "Compare f with WREG, Skip <" },
    { label: "DECF", detail: "Decrement f" },
    { label: "DECFSZ", detail: "Decrement f, Skip if 0" },
    { label: "DCFSNZ", detail: "Decrement f, Skip if Not 0" },
    { label: "INCF", detail: "Increment f" },
    { label: "INCFSZ", detail: "Increment f, Skip if 0" },
    { label: "INFSNZ", detail: "Increment f, Skip if Not 0" },
    { label: "IORWF", detail: "Inclusive OR WREG with f" },
    { label: "MOVF", detail: "Move f" },
    { label: "MOVFF", detail: "Move fs (source) to 1st word fd (destination) 2nd word" },
    { label: "MOVWF", detail: "Move WREG to f" },
    { label: "MULWF", detail: "Multiply WREG with f" },
    { label: "NEGF", detail: "Negate f" },
    { label: "RLCF", detail: "Rotate Left f through Carry" },
    { label: "RLNCF", detail: "Rotate Left f (No Carry)" },
    { label: "RRCF", detail: "Rotate Right f through Carry" },
    { label: "RRNCF", detail: "Rotate Right f (No Carry)" },
    { label: "SETF", detail: "Set f" },
    { label: "SUBFWB", detail: "Subtract f from WREG with Borrow" },
    { label: "SUBWF", detail: "Subtract WREG from f" },
    { label: "SUBWFB", detail: "Subtract WREG from f with Borrow" },
    { label: "SWAPF", detail: "Swap Nibbles in f" },
    { label: "TSTFSZ", detail: "Test f, Skip if 0" },
    { label: "XORWF", detail: "Exclusive OR WREG with f" },
    { label: "BCF", detail: "Bit Clear f" },
    { label: "BSF", detail: "Bit Set f" },
    { label: "BTFSC", detail: "Bit Test f, Skip if Clear" },
    { label: "BTFSS", detail: "Bit Test f, Skip if Set" },
    { label: "BTG", detail: "Bit Toggle f" },
    { label: "BC", detail: "Branch if Carry" },
    { label: "BN", detail: "Branch if Negative" },
    { label: "BNC", detail: "Branch if Not Carry" },
    { label: "BNN", detail: "Branch if Not Negative" },
    { label: "BNOV", detail: "Branch if Not Overflow" },
    { label: "BNZ", detail: "Branch if Not Zero" },
    { label: "BOV", detail: "Branch if Overflow" },
    { label: "BRA", detail: "Branch Unconditionally" },
    { label: "BZ", detail: "Branch if Zero" },
    { label: "CALL", detail: "Call Subroutine 1st word 2nd word" },
    { label: "CLRWDT", detail: "Clear Watchdog Timer" },
    { label: "DAW", detail: "Decimal Adjust WREG" },
    { label: "GOTO", detail: "Go to Address 1st word 2nd word" },
    { label: "NOP", detail: "No Operation" },
    { label: "POP", detail: "Pop Top of Return Stack (TOS)" },
    { label: "PUSH", detail: "Push Top of Return Stack (TOS)" },
    { label: "RCALL", detail: "Relative Call" },
    { label: "RESET", detail: "Software Device Reset" },
    { label: "RETFIE", detail: "Return from Interrupt Enable" },
    { label: "RETLW", detail: "Return with Literal in WREG" },
    { label: "RETURN", detail: "Return from Subroutine" },
    { label: "SLEEP", detail: "Go into Standby mode" },
    { label: "ADDLW", detail: "Add Literal and WREG" },
    { label: "ANDLW", detail: "AND Literal with WREG" },
    { label: "IORLW", detail: "Inclusive OR Literal with WREG" },
    { label: "LFSR", detail: "Move Literal (12-bit)2nd word to FSR(f) 1st word" },
    { label: "MOVLB", detail: "Move Literal to BSR<3:0>" },
    { label: "MOVLW", detail: "Move Literal to WREG" },
    { label: "MULLW", detail: "Multiply Literal with WREG" },
    { label: "SUBLW", detail: "Subtract WREG from Literal" },
    { label: "XORLW", detail: "Exclusive OR Literal with WREG" },
    { label: "TBLRD*", detail: "Table Read" },
    { label: "TBLRD*+", detail: "Table Read with Post-Increment" },
    { label: "TBLRD*-", detail: "Table Read with Post-Decrement" },
    { label: "TBLRD+*", detail: "Table Read with Pre-Increment" },
    { label: "TBLWT*", detail: "Table Write" },
    { label: "TBLWT*+", detail: "Table Write with Post-Increment" },
    { label: "TBLWT*-", detail: "Table Write with Post-Decrement" },
    { label: "TBLWT+*", detail: "Table Write with Pre-Increment" },
]

export const PIC_INSTRUCTIONS_COMPLETIONS = PIC_INSTRUCTIONS.map(({ label, detail }) => {
    const ci = new CompletionItem(label, CompletionItemKind.Snippet);
    ci.detail = detail;
    ci.insertText = label.startsWith("TBL") ? label : label + " ".repeat(8 - label.length);

    const labelKey = label.startsWith("TBL") ? label.slice(0, 5) : label;
    const instructionDetail = INSTRUCTION_DETAILS_MAP.get(labelKey as InstructionKey);
    if (instructionDetail) ci.documentation = new MarkdownString(instructionDetail);

    return ci;
})
