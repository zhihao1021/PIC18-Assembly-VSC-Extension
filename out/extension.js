"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);

// src/subscriptions/autoComplete.ts
var import_vscode6 = require("vscode");

// src/pic18/instructions.ts
var import_vscode = require("vscode");

// src/pic18/instruction_detail.ts
var INSTRUCTION_DETAILS = [
  {
    name: "ADDLW",
    content: `#### ADDLW
ADD Literal to W

|||
|---|---|
| Syntax:          | \`ADDLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | (W) + k \u2192 W |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0000 1111 kkkk kkkk |

**Description:** The contents of W are added to the 8-bit literal 'k' and the result is placed in W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example:**
\`\`\`
ADDLW 15h
\`\`\`

Before Instruction  
W = 10h  
After Instruction  
W = 25h`
  },
  {
    name: "ADDWF",
    content: `#### ADDWF
ADD W and f

|||
|---|---|
| Syntax:          | \`ADDWF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) + (f) \u2192 dest |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0001 11da ffff ffff |

**Description:** Add the contents of the W register to register 'f'. If 'd' is '0', the result is stored in the W register. If 'd' is '1', the result is stored back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
ADDWF REG, 0, 0
\`\`\`

Before Instruction  
W = 17h  
REG = 0C2h  
After Instruction  
W = D9h  
REG = 0C2h`
  },
  {
    name: "ADDWFC",
    content: `#### ADDWFC
ADD W and Carry bit to f

|||
|---|---|
| Syntax:          | \`ADDWFC f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) + (f) + (C) \u2192 dest |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0010 00da ffff ffff |

**Description:** Add W, the Carry flag and data memory location "f". If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed in data memory location "f". If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
ADDWFC REG, 0, 1
\`\`\`

Before Instruction  
Carry bit = 1  
REG = 02h  
W = 40h  
After Instruction  
Carry bit = 0  
REG = 02h  
W = 50h`
  },
  {
    name: "ANDLW",
    content: `#### ANDLW
AND Literal with W

|||
|---|---|
| Syntax:          | \`ANDLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | (W) .AND. k \u2192 W |
| Status Affected: | N, Z |
| Encoding:        | 0000 1011 kkkk kkkk |

**Description:** The contents of W are ANDed with the 8-bit literal 'k'. The result is placed in W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example:**
\`\`\`
ANDLW 5Fh
\`\`\`

Before Instruction  
W = A3h  
After Instruction  
W = 03h`
  },
  {
    name: "ANDWF",
    content: `#### ANDWF
AND W with f

|||
|---|---|
| Syntax:          | \`ANDWF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) .AND. (f) \u2192 dest |
| Status Affected: | N, Z |
| Encoding:        | 0001 01da ffff ffff |

**Description:** The contents of W are ANDed with register "f". If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in register "f" (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
ANDWF REG, 0, 0
\`\`\`

Before Instruction  
W = 17h  
REG = C2h  
After Instruction  
W = 02h  
REG = C2h`
  },
  {
    name: "BC",
    content: `#### BC
Branch if Carry

|||
|---|---|
| Syntax:          | \`BC n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | if Carry bit is '1', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0010 nnnn nnnn |

**Description:** If the Carry bit is '1', then the program will branch. The 2's complement number '2n' is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BC 5
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Carry = 1; PC = address (HERE + 12)  
If Carry = 0; PC = address (HERE + 2)`
  },
  {
    name: "BCF",
    content: `#### BCF
Bit Clear f

|||
|---|---|
| Syntax:          | \`BCF f, b {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 0 \u2264 b \u2264 7 a \u2208 [0,1] |
| Operation:       | 0 \u2192 f<b> |
| Status Affected: | None |
| Encoding:        | 1001 bbba ffff ffff |

**Description:** Bit 'b' in register 'f' is cleared. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
BCF FLAG_REG, 7, 0
\`\`\`

Before Instruction  
FLAG_REG = C7h  
After Instruction  
FLAG_REG = 47h`
  },
  {
    name: "BN",
    content: `#### BN
Branch if Negative

|||
|---|---|
| Syntax:          | \`BN n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | If Negative bit is '1', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0110 nnnn nnnn |

**Description:** If the Negative bit is '1', then the program will branch. The 2's complement number '2n' is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BN Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Negative = 1; PC = address (Jump)  
If Negative = 0; PC = address (HERE + 2)`
  },
  {
    name: "BNC",
    content: `#### BNC
Branch if Not Carry

|||
|---|---|
| Syntax:          | \`BNC n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | If Carry bit is '0', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0011 nnnn nnnn |

**Description:** If the Carry bit is '0', then the program will branch. The 2's complement number '2n' is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BNC Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Carry = 0; PC = address (Jump)  
If Carry = 1; PC = address (HERE + 2)`
  },
  {
    name: "BNN",
    content: `#### BNN
Branch if Not Negative

|||
|---|---|
| Syntax:          | \`BNN n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | If Negative bit is '0', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0111 nnnn nnnn |

**Description:** If the Negative bit is '0', then the program will branch. The 2's complement number '2n' is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BNN Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Negative = 0; PC = address (Jump)  
If Negative = 1; PC = address (HERE + 2)`
  },
  {
    name: "BNOV",
    content: `#### BNOV
Branch if Not Overflow

|||
|---|---|
| Syntax:          | \`BNOV n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | if Overflow bit is '0', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0101 nnnn nnnn |

**Description:** If the Overflow bit is '0', then the program will branch. The 2's complement number, '2n', is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BNOV Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Overflow = 0; PC = address (Jump)  
If Overflow = 1; PC = address (HERE + 2)`
  },
  {
    name: "BNZ",
    content: `#### BNZ
Branch if Not Zero

|||
|---|---|
| Syntax:          | \`BNZ n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | if Zero bit is '0', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0001 nnnn nnnn |

**Description:** If the Zero bit is '0', then the program will branch. The 2's complement number, '2n', is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BNZ Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Zero = 0; PC = address (Jump)  
If Zero = 1; PC = address (HERE + 2)`
  },
  {
    name: "BRA",
    content: `#### BRA
Unconditional Branch

|||
|---|---|
| Syntax:          | \`BRA n\` |
| Operands:        | -1024 \u2264 n \u2264 1023 |
| Operation:       | (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1101 0nnn nnnn nnnn |

**Description:** Add the 2's complement number, '2n', to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is a two-cycle instruction.

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) BRA Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
PC = address (Jump)`
  },
  {
    name: "BSF",
    content: `#### BSF
Bit Set f

|||
|---|---|
| Syntax:          | \`BSF f, b {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 0 \u2264 b \u2264 7 a \u2208 [0,1] |
| Operation:       | 1 \u2192 f<b> |
| Status Affected: | None |
| Encoding:        | 1000 bbba ffff ffff |

**Description:** Bit 'b' in register 'f' is set. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
BSF FLAG_REG, 7, 1
\`\`\`

Before Instruction  
FLAG_REG = 0Ah  
After Instruction  
FLAG_REG = 8Ah`
  },
  {
    name: "BTFSC",
    content: `#### BTFSC
Bit Test File, Skip if Clear

|||
|---|---|
| Syntax:          | \`BTFSC f, b {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 0 \u2264 b \u2264 7 a \u2208 [0,1] |
| Operation:       | skip if (f<b>) = 0 |
| Status Affected: | None |
| Encoding:        | 1011 bbba ffff ffff |

**Description:** If bit 'b' in register 'f' is '0', then the next instruction is skipped. If bit 'b' is '0', then the next instruction fetched during the current instruction execution is discarded and a NOP is executed instead, making this a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) BTFSC FLAG, 1  
FALSE :  
TRUE :  
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If FLAG<1> = 0; PC = address (TRUE)  
If FLAG<1> = 1; PC = address (FALSE)`
  },
  {
    name: "BTFSS",
    content: `#### BTFSS
Bit Test File, Skip if Set

|||
|---|---|
| Syntax:          | \`BTFSS f, b {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 0 \u2264 b \u2264 7 a \u2208 [0,1] |
| Operation:       | skip if (f<b>) = 1 |
| Status Affected: | None |
| Encoding:        | 1010 bbba ffff ffff |

**Description:** If bit 'b' in register 'f' is '1', then the next instruction is skipped. If bit 'b' is '1', then the next instruction fetched during the current instruction execution is discarded and a NOP is executed instead, making this a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) BTFSS FLAG, 1  
FALSE :  
TRUE :  
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If FLAG<1> = 1; PC = address (FALSE)  
If FLAG<1> = 0; PC = address (TRUE)`
  },
  {
    name: "BTG",
    content: `#### BTG
Bit Toggle f

|||
|---|---|
| Syntax:          | \`BTG f, b {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 0 \u2264 b \u2264 7 a \u2208 [0,1] |
| Operation:       | (f<b>) \u2192 f<b> |
| Status Affected: | None |
| Encoding:        | 0111 bbba ffff ffff |

**Description:** Bit 'b' in data memory location 'f' is inverted. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
BTG PORTC, 4, 0
\`\`\`

Before Instruction:  
PORTC = 0111 0101 [75h]  
After Instruction:  
PORTC = 0110 0101 [65h]`
  },
  {
    name: "BOV",
    content: `#### BOV
Branch if Overflow

|||
|---|---|
| Syntax:          | \`BOV n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | If Overflow bit is '1', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0100 nnnn nnnn |

**Description:** If the Overflow bit is '1', then the program will branch. The 2's complement number, '2n', is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BOV Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Overflow = 1; PC = address (Jump)  
If Overflow = 0; PC = address (HERE + 2)`
  },
  {
    name: "BZ",
    content: `#### BZ
Branch if Zero

|||
|---|---|
| Syntax:          | \`BZ n\` |
| Operands:        | -128 \u2264 n \u2264 127 |
| Operation:       | if Zero bit is '1', (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1110 0000 nnnn nnnn |

**Description:** If the Zero bit is '1', then the program will branch. The 2's complement number, '2n', is added to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is then a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  

**Q Cycle Activity:**
If Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| No operation | No operation | No operation | No operation |

If No Jump:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | No operation |

**Example:**
\`\`\`
(HERE) BZ Jump
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
If Zero = 1; PC = address (Jump)  
If Zero = 0; PC = address (HERE + 2)`
  },
  {
    name: "CALL",
    content: `#### CALL
Subroutine Call

|||
|---|---|
| Syntax:          | \`CALL k {,s}\` |
| Operands:        | 0 \u2264 k \u2264 1048575 s \u2208 [0,1] |
| Operation:       | (PC) + 4 \u2192 TOS, k \u2192 PC<20:1>; if s = 1, (W) \u2192 WS, (STATUS) \u2192 STATUSS, (BSR) \u2192 BSRS |
| Status Affected: | None |
| Encoding:        | 1st word: 1110 1111 110s kkkk<br>2nd word: kkkk kkkk kkkk kkkk |

**Description:** Subroutine call of entire 2-Mbyte memory range. First, return address (PC + 4) is pushed onto the return stack. If 's' = 1, the W, STATUS and BSR registers are also pushed into their respective shadow registers, WS, STATUSS and BSRS. If 's' = 0, no update occurs (default). Then, the 20-bit value 'k' is loaded into PC<20:1>. CALL is a two-cycle instruction.

**Words:** 2  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k'<7:0>, PUSH PC to stack | Read literal 'k'<19:8>, Write to PC | No operation |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) CALL THERE, 1
\`\`\`

Before Instruction  
PC = address (HERE)  
After Instruction  
PC = address (THERE)  
TOS = address (HERE + 4)  
WS = W  
BSRS = BSR  
STATUSS = STATUS`
  },
  {
    name: "CLRF",
    content: `#### CLRF
Clear f

|||
|---|---|
| Syntax:          | \`CLRF f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | 000h \u2192 f, 1 \u2192 Z |
| Status Affected: | Z |
| Encoding:        | 0110 101a ffff ffff |

**Description:** Clears the contents of the specified register. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
CLRF FLAG_REG, 1
\`\`\`

Before Instruction  
FLAG_REG = 5Ah  
After Instruction  
FLAG_REG = 00h`
  },
  {
    name: "CLRWDT",
    content: `#### CLRWDT
Clear Watchdog Timer

|||
|---|---|
| Syntax:          | \`CLRWDT\` |
| Operands:        | None |
| Operation:       | 000h \u2192 WDT, 000h \u2192 WDT postscaler, 1 \u2192 TO, 1 \u2192 PD |
| Status Affected: | TO, PD |
| Encoding:        | 0000 0000 0000 0100 |

**Description:** CLRWDT instruction resets the Watchdog Timer. It also resets the post-scaler of the WDT. Status bits, TO and PD, are set.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | Process Data | No operation |

**Example:**
\`\`\`
CLRWDT
\`\`\`

Before Instruction  
WDT Counter = ?  
After Instruction  
WDT Counter = 00h  
WDT Postscaler = 0  
TO = 1  
PD = 1`
  },
  {
    name: "COMF",
    content: `#### COMF
Complement f

|||
|---|---|
| Syntax:          | \`COMF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) \u2192 dest |
| Status Affected: | N, Z |
| Encoding:        | 0001 11da ffff ffff |

**Description:** The contents of register "f" are complemented. If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in register "f" (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
COMF REG, 0, 0
\`\`\`

Before Instruction  
REG = 13h  
After Instruction  
REG = 13h  
W = ECh`
  },
  {
    name: "CPFSEQ",
    content: `#### CPFSEQ
Compare f with W, Skip if f = W

|||
|---|---|
| Syntax:          | \`CPFSEQ f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (f) - (W), skip if (f) = (W) (unsigned comparison) |
| Status Affected: | None |
| Encoding:        | 0110 001a ffff ffff |

**Description:** Compares the contents of data memory location "f" to the contents of W by performing an unsigned subtraction. If "f = W, then the fetched instruction is discarded and a NOP is executed instead, making this a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) CPFSEQ REG, 0  
NEQUAL :  
EQUAL :  
\`\`\`

Before Instruction  
PC Address = HERE  
W = ?  
REG = ?  
After Instruction  
If REG = W; PC = Address (EQUAL)  
If REG \u2260 W; PC = Address (NEQUAL)`
  },
  {
    name: "CPFSGT",
    content: `#### CPFSGT
Compare f with W, Skip if f > W

|||
|---|---|
| Syntax:          | \`CPFSGT f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (f) - (W), skip if (f) > (W) (unsigned comparison) |
| Status Affected: | None |
| Encoding:        | 0110 010a ffff ffff |

**Description:** Compares the contents of data memory location 'f' to the contents of the W by performing an unsigned subtraction. If the contents of 'f' are greater than the contents of WREG, then the fetched instruction is discarded and a NOP is executed instead, making this a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) CPFSGT REG, 0  
NOGREATER :  
GREATER :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
W = ?  
After Instruction  
If REG > W; PC = Address (GREATER)  
If REG \u2264 W; PC = Address (NOGREATER)`
  },
  {
    name: "CPFSLT",
    content: `#### CPFSLT
Compare f with W, Skip if f < W

|||
|---|---|
| Syntax:          | \`CPFSLT f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (f) - (W), skip if (f) < (W) (unsigned comparison) |
| Status Affected: | None |
| Encoding:        | 0110 000a ffff ffff |

**Description:** Compares the contents of data memory location 'f' to the contents of W by performing an unsigned subtraction. If the contents of 'f' are less than the contents of W, then the fetched instruction is discarded and a NOP is executed instead, making this a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) CPFSLT REG, 1  
NLESS :  
LESS :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
W = ?  
After Instruction  
If REG < W; PC = Address (LESS)  
If REG \u2265 W; PC = Address (NLESS)`
  },
  {
    name: "DAW",
    content: `#### DAW
Decimal Adjust W Register

|||
|---|---|
| Syntax:          | \`DAW\` |
| Operands:        | None |
| Operation:       | If [W<3:0> > 9] or [DC = 1] then, (W<3:0>) + 6 \u2192 W<3:0>; else, (W<3:0>) \u2192 W<3:0>; |
| Status Affected: | C |
| Encoding:        | 0000 0000 0000 0111 |

**Description:** DAW adjusts the 8-bit value in W, resulting from the earlier addition of two variables (each in packed BCD format) and produces a correct packed BCD result.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register W | Process Data | Write W |

**Example:**
\`\`\`
DAW
\`\`\`

Before Instruction  
W = 59h  
After Instruction  
W = 59h`
  },
  {
    name: "DECF",
    content: `#### DECF
Decrement f

|||
|---|---|
| Syntax:          | \`DECF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) - 1 \u2192 dest |
| Status Affected: | C, DC, N, OV, Z |
| Encoding:        | 0000 01da ffff ffff |

**Description:** Decrement register 'f'. If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
DECF CNT, 1, 0
\`\`\`

Before Instruction  
CNT = 01h  
Z = 0  
After Instruction  
CNT = 00h  
Z = 1`
  },
  {
    name: "DECFSZ",
    content: `#### DECFSZ
Decrement f, Skip if 0

|||
|---|---|
| Syntax:          | \`DECFSZ f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) - 1 \u2192 dest, skip if result = 0 |
| Status Affected: | None |
| Encoding:        | 0010 11da ffff ffff |

**Description:** The contents of register "f" are decremented. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register "f" (default). If the result is '0', the next instruction, which is already fetched, is discarded and a NOP is executed instead, making it a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) DECFSZ CNT, 1, 0  
GOTO LOOP  
CONTINUE :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
After Instruction  
CNT = CNT - 1  
if CNT = 0: PC = Address (CONTINUE)  
if CNT \u2260 0: PC = Address (HERE + 2)`
  },
  {
    name: "DCFSNZ",
    content: `#### DCFSNZ
Decrement f, Skip if Not 0

|||
|---|---|
| Syntax:          | \`DCFSNZ f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) - 1 \u2192 dest, skip if result \u2260 0 |
| Status Affected: | None |
| Encoding:        | 0100 11da ffff ffff |

**Description:** The contents of register "f" are decremented. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register "f" (default). If the result is not '0', the next instruction, which is already fetched, is discarded and a NOP is executed instead, making it a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) DCFSNZ TEMP, 1, 0  
ZERO :  
NZERO :  
\`\`\`

Before Instruction  
TEMP = ?  
After Instruction  
TEMP = TEMP - 1,  
if TEMP = 0: PC = Address (ZERO)  
if TEMP \u2260 0: PC = Address (NZERO)`
  },
  {
    name: "GOTO",
    content: `#### GOTO
Unconditional Branch

|||
|---|---|
| Syntax:          | \`GOTO k\` |
| Operands:        | 0 \u2264 k \u2264 1048575 |
| Operation:       | k \u2192 PC<20:1> |
| Status Affected: | None |
| Encoding:        | 1st word: 1110 1111 kkkk kkkk<br>2nd word: 1111 kkkk kkkk kkkk |

**Description:** GOTO allows an unconditional branch anywhere within entire 2-Mbyte memory range. The 20-bit value 'k' is loaded into PC<20:1>. GOTO is always a two-cycle instruction.

**Words:** 2  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' <7:0> | No operation | Read literal 'k' <19:8>, Write to PC |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
GOTO THERE
\`\`\`

After Instruction  
PC = Address (THERE)`
  },
  {
    name: "INCF",
    content: `#### INCF
Increment f

|||
|---|---|
| Syntax:          | \`INCF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) + 1 \u2192 dest |
| Status Affected: | C, DC, N, OV, Z |
| Encoding:        | 0010 10da ffff ffff |

**Description:** The contents of register 'f' are incremented. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
INCF CNT, 1, 0
\`\`\`

Before Instruction  
CNT = FFh  
Z = 0  
C = ?  
DC = ?  
After Instruction  
CNT = 00h  
Z = 1  
C = 1  
DC = 1`
  },
  {
    name: "INCFSZ",
    content: `#### INCFSZ
Increment f, Skip if 0

|||
|---|---|
| Syntax:          | \`INCFSZ f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) + 1 \u2192 dest, skip if result = 0 |
| Status Affected: | None |
| Encoding:        | 0011 11da ffff ffff |

**Description:** The contents of register "f" are incremented. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register "f" (default). If the result is '0', the next instruction, which is already fetched, is discarded and a NOP is executed instead, making it a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) INCFSZ CNT, 1, 0  
NZERO :  
ZERO :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
After Instruction  
CNT = CNT + 1  
If CNT = 0; PC = Address (ZERO)  
If CNT \u2260 0; PC = Address (NZERO)`
  },
  {
    name: "INFSNZ",
    content: `#### INFSNZ
Increment f, Skip if Not 0

|||
|---|---|
| Syntax:          | \`INFSNZ f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) + 1 \u2192 dest, skip if result \u2260 0 |
| Status Affected: | None |
| Encoding:        | 0100 10da ffff ffff |

**Description:** The contents of register "f" are incremented. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register "f" (default). If the result is not '0', the next instruction, which is already fetched, is discarded and a NOP is executed instead, making it a two-cycle instruction.

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) INFSNZ REG, 1, 0  
ZERO :  
NZERO :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
After Instruction  
REG = REG + 1  
If REG = 0; PC = Address (ZERO)  
If REG \u2260 0; PC = Address (NZERO)`
  },
  {
    name: "IORLW",
    content: `#### IORLW
Inclusive OR Literal with W

|||
|---|---|
| Syntax:          | \`IORLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | (W) .OR. k \u2192 W |
| Status Affected: | N, Z |
| Encoding:        | 0000 1001 kkkk kkkk |

**Description:** The contents of W are ORed with the 8-bit literal 'k'. The result is placed in W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example:**
\`\`\`
IORLW 35h
\`\`\`

Before Instruction  
W = 9Ah  
After Instruction  
W = BFh`
  },
  {
    name: "IORWF",
    content: `#### IORWF
Inclusive OR W with f

|||
|---|---|
| Syntax:          | \`IORWF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) .OR. (f) \u2192 dest |
| Status Affected: | N, Z |
| Encoding:        | 0001 00da ffff ffff |

**Description:** Inclusive OR W with register 'f'. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
IORWF RESULT, 0, 1
\`\`\`

Before Instruction  
RESULT = 13h  
W = 91h  
After Instruction  
RESULT = 13h  
W = 93h`
  },
  {
    name: "LFSR",
    content: `#### LFSR
Load FSR

|||
|---|---|
| Syntax:          | \`LFSR f, k\` |
| Operands:        | 0 \u2264 f \u2264 2 0 \u2264 k \u2264 4095 |
| Operation:       | k \u2192 FSRf |
| Status Affected: | None |
| Encoding:        | 1st word: 1110 1110 00ff kkkk<br>2nd word: 1111 0000 kkkk kkkk |

**Description:** The 12-bit literal 'k' is loaded into the File Select Register pointed to by 'f'.

**Words:** 2  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' MSB | Process Data | Write literal 'k' MSB to FSRfH |
| Decode | Read literal 'k' LSB | Process Data | Write literal 'k' to FSRfL |

**Example:**
\`\`\`
LFSR 2, 3ABh
\`\`\`

After Instruction  
FSR2H = 03h  
FSR2L = ABh`
  },
  {
    name: "MOVF",
    content: `#### MOVF
Move f

|||
|---|---|
| Syntax:          | \`MOVF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | f \u2192 dest |
| Status Affected: | N, Z |
| Encoding:        | 0101 00da ffff ffff |

**Description:** The contents of register 'f' are moved to a destination dependent upon the status of 'd'. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register 'f' (default). Location 'f' can be anywhere in the 256-byte bank.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write W |

**Example:**
\`\`\`
MOVF REG, 0, 0
\`\`\`

Before Instruction  
REG = 22h  
W = FFh  
After Instruction  
REG = 22h  
W = 22h`
  },
  {
    name: "MOVFF",
    content: `#### MOVFF
Move f to f

|||
|---|---|
| Syntax:          | \`MOVFF fs, fd\` |
| Operands:        | 0 \u2264 fs \u2264 4095 0 \u2264 fd \u2264 4095 |
| Operation:       | (fs) \u2192 fd |
| Status Affected: | None |
| Encoding:        | 1st word (source): 1100 ffff ffff ffff<br>2nd word (destin.): 1111 ffff ffff ffff |

**Description:** The contents of source register 'fs' are moved to destination register 'fd'. Location of source 'fs' can be anywhere in the 4096-byte data space (000h to FFFh) and location of destination 'fd' can also be anywhere from 000h to FFFh. Either source or destination can be W (a useful special situation). MOVFF is particularly useful for transferring a data memory location to a peripheral register (such as the transmit buffer or an I/O port). The MOVFF instruction cannot use the PCL, TOSU, TOSH or TOSL as the destination register.

**Words:** 2  
**Cycles:** 2 (3)  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" (src) | Process Data | No operation |
| Decode | No operation No dummy read | No operation | Write register "f" (dest) |

**Example:**
\`\`\`
MOVFF REG1, REG2
\`\`\`

Before Instruction
REG1 = 33h
REG2 = 11h
After Instruction
REG1 = 33h
REG2 = 33h`
  },
  {
    name: "MOVLB",
    content: `#### MOVLB
Move Literal to Low Nibble in BSR

|||
|---|---|
| Syntax:          | \`MOVLB k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | k \u2192 BSR |
| Status Affected: | None |
| Encoding:        | 0000 0001 kkkk kkkk |

**Description:** The 8-bit literal 'k' is loaded into the Bank Select Register (BSR). The value of BSR<7:4> always remains '0', regardless of the value of k<7:4>.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write literal 'k' to BSR |

**Example:**
\`\`\`
MOVLB 5
\`\`\`

Before Instruction
BSR Register = 02h
After Instruction
BSR Register = 05h`
  },
  {
    name: "MOVLW",
    content: `#### MOVLW
Move Literal to W

|||
|---|---|
| Syntax:          | \`MOVLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | k \u2192 W |
| Status Affected: | None |
| Encoding:        | 0000 1110 kkkk kkkk |

**Description:** The 8-bit literal 'k' is loaded into W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example:**
\`\`\`
MOVLW 5Ah
\`\`\`

After Instruction
W = 5Ah`
  },
  {
    name: "MOVWF",
    content: `#### MOVWF
Move W to f

|||
|---|---|
| Syntax:          | \`MOVWF f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (W) \u2192 f |
| Status Affected: | None |
| Encoding:        | 0110 111a ffff ffff |

**Description:** Move data from W to register 'f'. Location 'f' can be anywhere in the 256-byte bank. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
MOVWF REG, 0
\`\`\`

Before Instruction
W = 4Fh
REG = FFh
After Instruction
W = 4Fh
REG = 4Fh`
  },
  {
    name: "MULLW",
    content: `#### MULLW
Multiply Literal with W

|||
|---|---|
| Syntax:          | \`MULLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | (W) x k \u2192 PRODH:PRODL |
| Status Affected: | None |
| Encoding:        | 0000 1101 kkkk kkkk |

**Description:** An unsigned multiplication is carried out between the contents of W and the 8-bit literal 'k'. The 16-bit result is placed in the PRODH:PRODL register pair. PRODH contains the high byte. W is unchanged. None of the Status flags are affected. Note that neither Overflow nor Carry is possible in this operation. A zero result is possible but not detected.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write registers PRODH: PRODL |

**Example:**
\`\`\`
MULLW 0C4h
\`\`\`

Before Instruction
W = E2h
PRODH = ?
PRODL = ?
After Instruction
W = E2h
PRODH = ADh
PRODL = 08h`
  },
  {
    name: "MULWF",
    content: `#### MULWF
Multiply W with f

|||
|---|---|
| Syntax:          | \`MULWF f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (W) x (f) \u2192 PRODH:PRODL |
| Status Affected: | None |
| Encoding:        | 0000 001a ffff ffff |

**Description:** An unsigned multiplication is carried out between the contents of W and the register file location 'f'. The 16-bit result is stored in the PRODH:PRODL register pair. PRODH contains the high byte. Both W and 'f' are unchanged. None of the Status flags are affected. Note that neither Overflow nor Carry is possible in this operation. A zero result is possible but not detected.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write registers PRODH: PRODL |

**Example:**
\`\`\`
MULWF REG, 1
\`\`\`

Before Instruction
W = C4h
REG = B5h
PRODH = ?
PRODL = ?
After Instruction
W = C4h
REG = B5h
PRODH = 8Ah
PRODL = 94h`
  },
  {
    name: "NEGF",
    content: `#### NEGF
Negate f

|||
|---|---|
| Syntax:          | \`NEGF f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | (f) + 1 \u2192 f |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0110 110a ffff ffff |

**Description:** Location "f" is negated using two's complement. The result is placed in the data memory location "f". If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write register 'f' |

**Example:**
\`\`\`
NEGF REG, 1
\`\`\`

Before Instruction
REG = 0011 1010 [3Ah]
After Instruction
REG = 1100 0110 [C6h]`
  },
  {
    name: "NOP",
    content: `#### NOP
No Operation

|||
|---|---|
| Syntax:          | \`NOP\` |
| Operands:        | None |
| Operation:       | No operation |
| Status Affected: | None |
| Encoding:        | 0000 0000 0000 0000 |

**Description:** No operation.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | No operation | No operation |

**Example:**
None.`
  },
  {
    name: "POP",
    content: `#### POP
Pop Top of Return Stack

|||
|---|---|
| Syntax:          | \`POP\` |
| Operands:        | None |
| Operation:       | (TOS) \u2192 bit bucket |
| Status Affected: | None |
| Encoding:        | 0000 0000 0000 0110 |

**Description:** The TOS value is pulled off the return stack and is discarded. The TOS value then becomes the previous value that was pushed onto the return stack. This instruction is provided to enable the user to properly manage the return stack to incorporate a software stack.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | POP TOS value | No operation |

**Example:**
\`\`\`
POP
GOTO NEW
\`\`\`

Before Instruction
TOS = 0031A2h
Stack (1 level down) = 014332h
After Instruction
TOS = 014332h
PC = NEW`
  },
  {
    name: "PUSH",
    content: `#### PUSH
Push Top of Return Stack

|||
|---|---|
| Syntax:          | \`PUSH\` |
| Operands:        | None |
| Operation:       | (PC + 2) \u2192 TOS |
| Status Affected: | None |
| Encoding:        | 0000 0000 0000 0101 |

**Description:** The PC + 2 is pushed onto the top of the return stack. The previous TOS value is pushed down on the stack. This instruction allows implementing a software stack by modifying TOS and then pushing it onto the return stack.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | PUSH PC + 2 onto return stack | No operation | No operation |

**Example:**
\`\`\`
PUSH
\`\`\`

Before Instruction
TOS = 345Ah
PC = 0124h
After Instruction
PC = 0126h
TOS = 0126h
Stack (1 level down) = 345Ah`
  },
  {
    name: "RCALL",
    content: `#### RCALL
Relative Call

|||
|---|---|
| Syntax:          | \`RCALL n\` |
| Operands:        | -1024 \u2264 n \u2264 1023 |
| Operation:       | (PC) + 2 \u2192 TOS, (PC) + 2 + 2n \u2192 PC |
| Status Affected: | None |
| Encoding:        | 1101 1nnn nnnn nnnn |

**Description:** Subroutine call with a jump up to 1K from the current location. First, return address (PC + 2) is pushed onto the stack. Then, add the 2's complement number '2n' to the PC. Since the PC will have incremented to fetch the next instruction, the new address will be PC + 2 + 2n. This instruction is a two-cycle instruction.

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'n' | Process Data | Write to PC |
| PUSH PC to stack | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) RCALL Jump
\`\`\`

Before Instruction
PC = Address (HERE)
After Instruction
PC = Address (Jump)
TOS = Address (HERE + 2)`
  },
  {
    name: "RESET",
    content: `#### RESET
Reset

|||
|---|---|
| Syntax:          | \`RESET\` |
| Operands:        | None |
| Operation:       | Reset all registers and flags that are affected by a MCLR Reset. |
| Status Affected: | All |
| Encoding:        | 0000 0000 1111 1111 |

**Description:** This instruction provides a way to execute a MCLR Reset in software.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Start Reset | No operation | No operation |

**Example:**
\`\`\`
RESET
\`\`\`

After Instruction
Registers = Reset Value
Flags* = Reset Value`
  },
  {
    name: "RETFIE",
    content: `#### RETFIE
Return from Interrupt

|||
|---|---|
| Syntax:          | \`RETFIE {s}\` |
| Operands:        | s \u2208 [0,1] |
| Operation:       | (TOS) \u2192 PC, 1 \u2192 GIE/GIEH or PEIE/GIEL; if s = 1, (WS) \u2192 W, (STATUSS) \u2192 STATUS, (BSRS) \u2192 BSR, PCLATU, PCLATH are unchanged |
| Status Affected: | GIE/GIEH, PEIE/GIEL |
| Encoding:        | 0000 0000 0001 000s |

**Description:** Return from interrupt. Stack is popped and Top-of-Stack (TOS) is loaded into the PC. Interrupts are enabled by setting either the high or low-priority global interrupt enable bit. If 's' = 1, the contents of the shadow registers, WS, STATUSS and BSRS, are loaded into their corresponding registers, W, STATUS and BSR. If 's' = 0, no update of these registers occurs (default).

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | No operation | POP PC from stack Set GIEH or GIEL |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
RETFIE 1
\`\`\`

After Interrupt
PC = TOS
W = WS
BSR = BSRS
STATUS = STATUSS
GIE/GIEH, PEIE/GIEL = 1`
  },
  {
    name: "RETLW",
    content: `#### RETLW
Return Literal to W

|||
|---|---|
| Syntax:          | \`RETLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | k \u2192 W, (TOS) \u2192 PC, PCLATU, PCLATH are unchanged |
| Status Affected: | None |
| Encoding:        | 0000 1100 kkkk kkkk |

**Description:** W is loaded with the 8-bit literal 'k'. The program counter is loaded from the top of the stack (the return address). The high address latch (PCLATH) remains unchanged.

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | POP PC from stack, Write to W |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
CALL TABLE ; W contains table offset value
; W now has table value
\`\`\`

TABLE
ADDWF PCL ; W = offset
RETLW k0 ; Begin table
RETLW k1 ;
RETLW kn ; End of table

Before Instruction
W = 07h
After Instruction
W = value of kn`
  },
  {
    name: "RETURN",
    content: `#### RETURN
Return from Subroutine

|||
|---|---|
| Syntax:          | \`RETURN {s}\` |
| Operands:        | s \u2208 [0,1] |
| Operation:       | (TOS) \u2192 PC; if s = 1, (WS) \u2192 W, (STATUSS) \u2192 STATUS, (BSRS) \u2192 BSR, PCLATU, PCLATH are unchanged |
| Status Affected: | None |
| Encoding:        | 0000 0000 0001 001s |

**Description:** Return from subroutine. The stack is popped and the top of the stack (TOS) is loaded into the program counter. If 's' = 1, the contents of the shadow registers, WS, STATUSS and BSRS, are loaded into their corresponding registers, W, STATUS and BSR. If 's' = 0, no update of these registers occurs (default).

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | Process Data | POP PC from stack |
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
RETURN
\`\`\`

After Instruction:
PC = TOS`
  },
  {
    name: "RLCF",
    content: `#### RLCF
Rotate Left f through Carry

|||
|---|---|
| Syntax:          | \`RLCF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f<n>) \u2192 dest<n + 1>, (f<7>) \u2192 C, (C) \u2192 dest<0> |
| Status Affected: | C, N, Z |
| Encoding:        | 0011 01da ffff ffff |

**Description:** The contents of register "f" are rotated one bit to the left through the Carry flag. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is stored back in register "f" (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
RLCF REG, 0, 0
\`\`\`

Before Instruction
REG = 1110 0110
C = 0
After Instruction
REG = 1110 0110
W = 1100 1100
C = 1`
  },
  {
    name: "RLNCF",
    content: `#### RLNCF
Rotate Left f (No Carry)

|||
|---|---|
| Syntax:          | \`RLNCF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f<n>) \u2192 dest<n + 1>, (f<7>) \u2192 dest<0> |
| Status Affected: | N, Z |
| Encoding:        | 0100 01da ffff ffff |

**Description:** The contents of register "f" are rotated one bit to the left. If "d" is "0", the result is placed in W. If "d" is "1", the result is stored back in register "f" (default). If "a" is "0", the Access Bank is selected. If "a" is "1", the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
RLNCF REG, 1, 0
\`\`\`

Before Instruction
REG = 1010 1011
After Instruction
REG = 0101 0111`
  },
  {
    name: "RRCF",
    content: `#### RRCF
Rotate Right f through Carry

|||
|---|---|
| Syntax:          | \`RRCF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f<n>) \u2192 dest<n - 1>, (f<0>) \u2192 C, (C) \u2192 dest<7> |
| Status Affected: | C, N, Z |
| Encoding:        | 0011 00da ffff ffff |

**Description:** The contents of register "f" are rotated one bit to the right through the Carry flag. If "d" is "0", the result is placed in W. If "d" is "1", the result is placed back in register "f" (default). If "a" is "0", the Access Bank is selected. If "a" is "1", the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example:**
\`\`\`
RRCF REG, 0, 0
\`\`\`

Before Instruction
REG = 1110 0110
C = 0
After Instruction
REG = 1110 0110
W = 0111 0011
C = 0`
  },
  {
    name: "RRNCF",
    content: `#### RRNCF
Rotate Right f (No Carry)

|||
|---|---|
| Syntax:          | \`RRNCF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f<n>) \u2192 dest<n - 1>, (f<0>) \u2192 dest<7> |
| Status Affected: | N, Z |
| Encoding:        | 0100 00da ffff ffff |

**Description:** The contents of register "f" are rotated one bit to the right. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed back in register "f" (default). If 'a' is '0', the Access Bank will be selected, overriding the BSR value. If 'a' is '1', then the bank will be selected as per the BSR value (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write to destination |

**Example 1:**
\`\`\`
RRNCF REG, 1, 0
\`\`\`

Before Instruction  
REG = 1101 0111  
After Instruction  
REG = 1110 1011

**Example 2:**
\`\`\`
RRNCF REG, 0, 0
\`\`\`

Before Instruction  
W = ?  
REG = 1101 0111  
After Instruction  
W = 1110 1011  
REG = 1101 0111`
  },
  {
    name: "SETF",
    content: `#### SETF
Set f

|||
|---|---|
| Syntax:          | \`SETF f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | FFh \u2192 f |
| Status Affected: | None |
| Encoding:        | 0110 100a ffff ffff |

**Description:** The contents of the specified register are set to FFh. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register "f" | Process Data | Write register "f" |

**Example:**
\`\`\`
SETF REG, 1
\`\`\`

Before Instruction  
REG = 5Ah  
After Instruction  
REG = FFh`
  },
  {
    name: "SLEEP",
    content: `#### SLEEP
Enter Sleep mode

|||
|---|---|
| Syntax:          | \`SLEEP\` |
| Operands:        | None |
| Operation:       | 00h \u2192 WDT, 0 \u2192 WDT postscaler, 1 \u2192 TO, 0 \u2192 PD |
| Status Affected: | TO, PD |
| Encoding:        | 0000 0000 0000 0011 |

**Description:** The Power-Down status bit (PD) is cleared. The Time-out status bit (TO) is set. Watchdog Timer and its post-scaler are cleared. The processor is put into Sleep mode with the oscillator stopped.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | Process Data | Go to Sleep |

**Example:**
\`\`\`
SLEEP
\`\`\`

Before Instruction  
TO = ?  
PD = ?  
After Instruction  
TO = 1\u2191  
PD = 0

\u2191 If WDT causes wake-up, this bit is cleared.`
  },
  {
    name: "SUBFWB",
    content: `#### SUBFWB
Subtract f from W with Borrow

|||
|---|---|
| Syntax:          | \`SUBFWB f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) \u2013 (f) \u2013 (C) \u2192 dest |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0101 01da ffff ffff |

**Description:** Subtract register 'f' and Carry flag (borrow) from W (2's complement method). If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example 1:**
\`\`\`
SUBFWB REG, 1, 0
\`\`\`

Before Instruction  
REG = 3  
W = 2  
C = 1  
After Instruction  
REG = FF  
W = 2  
C = 0  
Z = 0  
N = 1 ; result is negative

**Example 2:**
\`\`\`
SUBFWB REG, 0, 0
\`\`\`

Before Instruction  
REG = 2  
W = 5  
C = 1  
After Instruction  
REG = 2  
W = 3  
C = 1  
Z = 0  
N = 0 ; result is positive

**Example 3:**
\`\`\`
SUBFWB REG, 1, 0
\`\`\`

Before Instruction  
REG = 1  
W = 2  
C = 0  
After Instruction  
REG = 0  
W = 2  
C = 1  
Z = 1 ; result is zero  
N = 0`
  },
  {
    name: "SUBLW",
    content: `#### SUBLW
Subtract W from Literal

|||
|---|---|
| Syntax:          | \`SUBLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | k \u2013 (W) \u2192 W |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0000 1000 kkkk kkkk |

**Description:** W is subtracted from the 8-bit literal 'k'. The result is placed in W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example 1:**
\`\`\`
SUBLW 02h
\`\`\`

Before Instruction  
W = 01h  
C = ?  
After Instruction  
W = 01h  
C = 1 ; result is positive  
Z = 0  
N = 0

**Example 2:**
\`\`\`
SUBLW 02h
\`\`\`

Before Instruction  
W = 02h  
C = ?  
After Instruction  
W = 00h  
C = 1 ; result is zero  
Z = 1  
N = 0

**Example 3:**
\`\`\`
SUBLW 02h
\`\`\`

Before Instruction  
W = 03h  
C = ?  
After Instruction  
W = FFh ; (2's complement)  
C = 0 ; result is negative  
Z = 0  
N = 1`
  },
  {
    name: "SUBWF",
    content: `#### SUBWF
Subtract W from f

|||
|---|---|
| Syntax:          | \`SUBWF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) \u2013 (W) \u2192 dest |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0101 11da ffff ffff |

**Description:** Subtract W from register 'f' (2's complement method). If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example 1:**
\`\`\`
SUBWF REG, 1, 0
\`\`\`

Before Instruction  
REG = 3  
W = 2  
C = ?  
After Instruction  
REG = 1  
W = 2  
C = 1 ; result is positive  
Z = 0  
N = 0

**Example 2:**
\`\`\`
SUBWF REG, 0, 0
\`\`\`

Before Instruction  
REG = 2  
W = 2  
C = ?  
After Instruction  
REG = 2  
W = 0  
C = 1 ; result is zero  
Z = 1  
N = 0

**Example 3:**
\`\`\`
SUBWF REG, 1, 0
\`\`\`

Before Instruction  
REG = 1  
W = 2  
C = ?  
After Instruction  
REG = FFh ; (2's complement)  
W = 2  
C = 0 ; result is negative  
Z = 0  
N = 1`
  },
  {
    name: "SUBWFB",
    content: `#### SUBWFB
Subtract W from f with Borrow

|||
|---|---|
| Syntax:          | \`SUBWFB f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f) \u2013 (W) \u2013 (C) \u2192 dest |
| Status Affected: | N, OV, C, DC, Z |
| Encoding:        | 0101 10da ffff ffff |

**Description:** Subtract W and the Carry flag (borrow) from register 'f' (2's complement method). If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example 1:**
\`\`\`
SUBWFB REG, 1, 0
\`\`\`

Before Instruction  
REG = 19h (0001 1001)  
W = 0Dh (0000 1101)  
C = 1  
After Instruction  
REG = 0Bh (0000 1011)  
W = 0Dh (0000 1101)  
Z = 0  
C = 1  
N = 0 ; result is positive

**Example 2:**
\`\`\`
SUBWFB REG, 0, 0
\`\`\`

Before Instruction  
REG = 1Bh (0001 1011)  
W = 1Ah (0001 1010)  
C = 0  
After Instruction  
REG = 1Bh (0001 1011)  
W = 00h  
C = 1  
Z = 1  
N = 0

**Example 3:**
\`\`\`
SUBWFB REG, 1, 0
\`\`\`

Before Instruction  
REG = 03h (0000 0011)  
W = 0Eh (0000 1101)  
C = 1  
After Instruction  
REG = F4h (1111 0100) ; [2's comp]  
W = 0Eh (0000 1101)  
C = 0  
Z = 0  
N = 1 ; result is negative`
  },
  {
    name: "SWAPF",
    content: `#### SWAPF
Swap f

|||
|---|---|
| Syntax:          | \`SWAPF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (f<3:0>) \u2192 dest<7:4>, (f<7:4>) \u2192 dest<3:0> |
| Status Affected: | None |
| Encoding:        | 0011 10da ffff ffff |

**Description:** The upper and lower nibbles of register 'f' are exchanged. If 'd' is '0', the result is placed in W. If 'd' is '1', the result is placed in register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
SWAPF REG, 1, 0
\`\`\`

Before Instruction  
REG = 53h  
After Instruction  
REG = 35h`
  },
  {
    name: "TBLRD",
    content: `#### TBLRD
Table Read

|||
|---|---|
| Syntax:          | \`TBLRD (*; *+; *-; +*)\` |
| Operands:        | None |
| Operation:       | if TBLRD *, (Prog Mem (TBLPTR)) \u2192 TABLAT, TBLPTR \u2013 No Change; if TBLRD *+, (Prog Mem (TBLPTR)) \u2192 TABLAT, (TBLPTR) + 1 \u2192 TBLPTR; if TBLRD *-, (Prog Mem (TBLPTR)) \u2192 TABLAT, (TBLPTR) \u2013 1 \u2192 TBLPTR; if TBLRD +*, (TBLPTR) + 1 \u2192 TBLPTR, (Prog Mem (TBLPTR)) \u2192 TABLAT |
| Status Affected: | None |
| Encoding:        | 0000 0000 0000 10mm (mm=00: *, 01: *+, 10: *-, 11: +*) |

**Description:** This instruction is used to read the contents of Program Memory (P.M.). To address the program memory, a pointer called Table Pointer (TBLPTR) is used. The TBLPTR (a 21-bit pointer) points to each byte in the program memory. TBLPTR has a 2-Mbyte address range.

TBLPTR<0> = 0: Least Significant Byte of Program Memory Word  
TBLPTR<0> = 1: Most Significant Byte of Program Memory Word  
The TBLRD instruction can modify the value of TBLPTR as follows:  
- no change  
- post-increment  
- post-decrement  
- pre-increment

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | No operation | No operation |
| No operation | No operation (Read Program Memory) | No operation | No operation (Write TABLAT) |

**Example 1:**
\`\`\`
TBLRD *+
\`\`\`

Before Instruction  
TABLAT = 55h  
TBLPTR = 00A356h  
MEMORY (00A356h) = 34h  
After Instruction  
TABLAT = 34h  
TBLPTR = 00A357h

**Example 2:**
\`\`\`
TBLRD +*
\`\`\`

Before Instruction  
TABLAT = AAh  
TBLPTR = 01A357h  
MEMORY (01A357h) = 12h  
MEMORY (01A358h) = 34h  
After Instruction  
TABLAT = 34h  
TBLPTR = 01A358h`
  },
  {
    name: "TBLWT",
    content: `#### TBLWT
Table Write

|||
|---|---|
| Syntax:          | \`TBLWT (*; *+; *-; +*)\` |
| Operands:        | None |
| Operation:       | if TBLWT *, (TABLAT) \u2192 Holding Register, TBLPTR \u2192 No Change; if TBLWT *+, (TABLAT) \u2192 Holding Register, (TBLPTR) + 1 \u2192 TBLPTR; if TBLWT *-, (TABLAT) \u2192 Holding Register, (TBLPTR) \u2013 1 \u2192 TBLPTR; if TBLWT +*, (TBLPTR) + 1 \u2192 TBLPTR, (TABLAT) \u2192 Holding Register |
| Status Affected: | None |
| Encoding:        | 0000 0000 0000 11mm (mm=00: *, 01: *+, 10: *-, 11: +*) |

**Description:** This instruction uses the 3 LSBs of TBLPTR to determine which of the 8 holding registers the TABLAT is written to. The holding registers are used to program the contents of Program Memory (P.M.). The TBLPTR (a 21-bit pointer) points to each byte in the program memory. TBLPTR has a 2-MByte address range. The LSB of the TBLPTR selects which byte of the program memory location to access.

TBLPTR<0> = 0: Least Significant Byte of Program Memory Word  
TBLPTR<0> = 1: Most Significant Byte of Program Memory Word  
The TBLWT instruction can modify the value of TBLPTR as follows:  
- no change  
- post-increment  
- post-decrement  
- pre-increment

**Words:** 1  
**Cycles:** 2  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | No operation | No operation | No operation |
| No operation | No operation (Read TABLAT) | No operation (Write to Holding Register) | No operation |

**Example 1:**
\`\`\`
TBLWT *+
\`\`\`

Before Instruction  
TABLAT = 55h  
TBLPTR = 00A356h  
HOLDING REGISTER (00A356h) = FFh  
After Instructions (table write completion)  
TABLAT = 55h  
TBLPTR = 00A357h  
HOLDING REGISTER (00A356h) = 55h

**Example 2:**
\`\`\`
TBLWT +*
\`\`\`

Before Instruction  
TABLAT = 34h  
TBLPTR = 01389Ah  
HOLDING REGISTER (01389Ah) = FFh  
HOLDING REGISTER (01389Bh) = FFh  
After Instruction (table write completion)  
TABLAT = 34h  
TBLPTR = 01389Bh  
HOLDING REGISTER (01389Ah) = FFh  
HOLDING REGISTER (01389Bh) = 34h`
  },
  {
    name: "TSTFSZ",
    content: `#### TSTFSZ
Test f, Skip if 0

|||
|---|---|
| Syntax:          | \`TSTFSZ f {,a}\` |
| Operands:        | 0 \u2264 f \u2264 255 a \u2208 [0,1] |
| Operation:       | skip if f = 0 |
| Status Affected: | None |
| Encoding:        | 0110 011a ffff ffff |

**Description:** If 'f' = 0, the next instruction fetched during the current instruction execution is discarded and a NOP is executed, making this a two-cycle instruction. If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1(2)  
**Note:** 3 cycles if skip and followed by a 2-word instruction.

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | No operation |

If skip:

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| No operation | No operation | No operation | No operation |

**Example:**
\`\`\`
(HERE) TSTFSZ CNT, 0  
NZERO :  
ZERO :  
\`\`\`

Before Instruction  
PC = Address (HERE)  
After Instruction  
if CNT = 00h, PC = Address (ZERO)  
if CNT \u2260 00h, PC = Address (NZERO)`
  },
  {
    name: "XORLW",
    content: `#### XORLW
Exclusive OR Literal with W

|||
|---|---|
| Syntax:          | \`XORLW k\` |
| Operands:        | 0 \u2264 k \u2264 255 |
| Operation:       | (W) .XOR. k \u2192 W |
| Status Affected: | N, Z |
| Encoding:        | 0000 1010 kkkk kkkk |

**Description:** The contents of W are XORed with the 8-bit literal 'k'. The result is placed in W.

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read literal 'k' | Process Data | Write to W |

**Example:**
\`\`\`
XORLW 0AFh
\`\`\`

Before Instruction  
W = B5h  
After Instruction  
W = 1Ah`
  },
  {
    name: "XORWF",
    content: `#### XORWF
Exclusive OR W with f

|||
|---|---|
| Syntax:          | \`XORWF f {,d {,a}}\` |
| Operands:        | 0 \u2264 f \u2264 255 d \u2208 [0,1] a \u2208 [0,1] |
| Operation:       | (W) .XOR. (f) \u2192 dest |
| Status Affected: | N, Z |
| Encoding:        | 0001 10da ffff ffff |

**Description:** Exclusive OR the contents of W with register 'f'. If 'd' is '0', the result is stored in W. If 'd' is '1', the result is stored back in the register 'f' (default). If 'a' is '0', the Access Bank is selected. If 'a' is '1', the BSR is used to select the GPR bank (default).

**Words:** 1  
**Cycles:** 1  

**Q Cycle Activity:**

| Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|
| Decode | Read register 'f' | Process Data | Write to destination |

**Example:**
\`\`\`
XORWF REG, 1, 0
\`\`\`

Before Instruction  
REG = AFh  
W = B5h  
After Instruction  
REG = 1Ah  
W = B5h`
  }
];
var INSTRUCTION_DETAILS_MAP = new Map(INSTRUCTION_DETAILS.map(
  (detail) => [detail.name, detail.content]
));

// src/pic18/instructions.ts
var PIC_INSTRUCTIONS = [
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
  { label: "TBLWT+*", detail: "Table Write with Pre-Increment" }
];
var PIC_INSTRUCTIONS_COMPLETIONS = PIC_INSTRUCTIONS.map(({ label, detail }) => {
  const ci = new import_vscode.CompletionItem(label, import_vscode.CompletionItemKind.Snippet);
  ci.detail = detail;
  ci.insertText = label.startsWith("TBL") ? label : label + " ".repeat(8 - label.length);
  const labelKey = label.startsWith("TBL") ? label.slice(0, 5) : label;
  const instructionDetail = INSTRUCTION_DETAILS_MAP.get(labelKey);
  if (instructionDetail) ci.documentation = new import_vscode.MarkdownString(instructionDetail);
  return ci;
});

// src/pic18/utils.ts
function isBranchAutoComplete(linePrefix) {
  const labelContextMatch = linePrefix.match(/(?:^|\s)(BC|BN|BNC|BNN|BNOV|BNZ|BOV|BRA|BZ|CALL|RCALL|GOTO)\s+([\dA-Za-z_\?\$]*)$/i);
  return labelContextMatch !== null;
}

// src/pic18/define.ts
var import_vscode2 = require("vscode");

// src/pic18/define/difference.json
var difference_default = {
  ABDEN: {
    xc8: "BANKMASK(BAUDCON), 0, a",
    mpasm: "0"
  },
  ABDOVF: {
    xc8: "BANKMASK(BAUDCON), 7, a",
    mpasm: "7"
  },
  ACKDT: {
    xc8: "BANKMASK(SSPCON2), 5, a",
    mpasm: "5"
  },
  ACKEN: {
    xc8: "BANKMASK(SSPCON2), 4, a",
    mpasm: "4"
  },
  ACKSTAT: {
    xc8: "BANKMASK(SSPCON2), 6, a",
    mpasm: "6"
  },
  ACQT0: {
    xc8: "BANKMASK(ADCON2), 3, a",
    mpasm: "3"
  },
  ACQT1: {
    xc8: "BANKMASK(ADCON2), 4, a",
    mpasm: "4"
  },
  ACQT2: {
    xc8: "BANKMASK(ADCON2), 5, a",
    mpasm: "5"
  },
  ADCS0: {
    xc8: "BANKMASK(ADCON2), 0, a",
    mpasm: "0"
  },
  ADCS1: {
    xc8: "BANKMASK(ADCON2), 1, a",
    mpasm: "1"
  },
  ADCS2: {
    xc8: "BANKMASK(ADCON2), 2, a",
    mpasm: "2"
  },
  ADDEN: {
    xc8: "BANKMASK(RCSTA), 3, a",
    mpasm: "3"
  },
  ADEN: {
    xc8: "BANKMASK(RCSTA), 3, a",
    mpasm: "3"
  },
  ADFM: {
    xc8: "BANKMASK(ADCON2), 7, a",
    mpasm: "7"
  },
  ADIE: {
    xc8: "BANKMASK(PIE1), 6, a",
    mpasm: "6"
  },
  ADIF: {
    xc8: "BANKMASK(PIR1), 6, a",
    mpasm: "6"
  },
  ADIP: {
    xc8: "BANKMASK(IPR1), 6, a",
    mpasm: "6"
  },
  ADMSK1: {
    xc8: "BANKMASK(SSPCON2), 1, a",
    mpasm: "1"
  },
  ADMSK2: {
    xc8: "BANKMASK(SSPCON2), 2, a",
    mpasm: "2"
  },
  ADMSK3: {
    xc8: "BANKMASK(SSPCON2), 3, a",
    mpasm: "3"
  },
  ADMSK4: {
    xc8: "BANKMASK(SSPCON2), 4, a",
    mpasm: "4"
  },
  ADMSK5: {
    xc8: "BANKMASK(SSPCON2), 5, a",
    mpasm: "5"
  },
  ADON: {
    xc8: "BANKMASK(ADCON0), 0, a",
    mpasm: "0"
  },
  AN0: {
    xc8: "BANKMASK(PORTA), 0, a",
    mpasm: "0"
  },
  AN1: {
    xc8: "BANKMASK(PORTA), 1, a",
    mpasm: "1"
  },
  AN10: {
    xc8: "BANKMASK(PORTB), 1, a",
    mpasm: "1"
  },
  AN11: {
    xc8: "BANKMASK(PORTB), 4, a",
    mpasm: "4"
  },
  AN12: {
    xc8: "BANKMASK(PORTB), 0, a",
    mpasm: "0"
  },
  AN2: {
    xc8: "BANKMASK(PORTA), 2, a",
    mpasm: "2"
  },
  AN3: {
    xc8: "BANKMASK(PORTA), 3, a",
    mpasm: "3"
  },
  AN4: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  AN5: {
    xc8: "BANKMASK(PORTE), 0, a",
    mpasm: "0"
  },
  AN6: {
    xc8: "BANKMASK(PORTE), 1, a",
    mpasm: "1"
  },
  AN7: {
    xc8: "BANKMASK(PORTE), 2, a",
    mpasm: "2"
  },
  AN8: {
    xc8: "BANKMASK(PORTB), 2, a",
    mpasm: "2"
  },
  AN9: {
    xc8: "BANKMASK(PORTB), 3, a",
    mpasm: "3"
  },
  BCLIE: {
    xc8: "BANKMASK(PIE2), 3, a",
    mpasm: "3"
  },
  BCLIF: {
    xc8: "BANKMASK(PIR2), 3, a",
    mpasm: "3"
  },
  BCLIP: {
    xc8: "BANKMASK(IPR2), 3, a",
    mpasm: "3"
  },
  BF: {
    xc8: "BANKMASK(SSPSTAT), 0, a",
    mpasm: "0"
  },
  BGST: {
    xc8: "BANKMASK(HLVDCON), 5, a",
    mpasm: "5"
  },
  BOR: {
    xc8: "BANKMASK(RCON), 0, a",
    mpasm: "0"
  },
  BRG16: {
    xc8: "BANKMASK(BAUDCON), 3, a",
    mpasm: "3"
  },
  BRGH: {
    xc8: "BANKMASK(TXSTA), 2, a",
    mpasm: "2"
  },
  C1INV: {
    xc8: "BANKMASK(CMCON), 4, a",
    mpasm: "4"
  },
  C2INV: {
    xc8: "BANKMASK(CMCON), 5, a",
    mpasm: "5"
  },
  CCP1: {
    xc8: "BANKMASK(PORTC), 2, a",
    mpasm: "2"
  },
  CCP1IE: {
    xc8: "BANKMASK(PIE1), 2, a",
    mpasm: "2"
  },
  CCP1IF: {
    xc8: "BANKMASK(PIR1), 2, a",
    mpasm: "2"
  },
  CCP1IP: {
    xc8: "BANKMASK(IPR1), 2, a",
    mpasm: "2"
  },
  CCP1M0: {
    xc8: "BANKMASK(CCP1CON), 0, a",
    mpasm: "0"
  },
  CCP1M1: {
    xc8: "BANKMASK(CCP1CON), 1, a",
    mpasm: "1"
  },
  CCP1M2: {
    xc8: "BANKMASK(CCP1CON), 2, a",
    mpasm: "2"
  },
  CCP1M3: {
    xc8: "BANKMASK(CCP1CON), 3, a",
    mpasm: "3"
  },
  CCP1X: {
    xc8: "BANKMASK(CCP1CON), 5, a",
    mpasm: "5"
  },
  CCP1Y: {
    xc8: "BANKMASK(CCP1CON), 4, a",
    mpasm: "4"
  },
  CCP2IE: {
    xc8: "BANKMASK(PIE2), 0, a",
    mpasm: "0"
  },
  CCP2IF: {
    xc8: "BANKMASK(PIR2), 0, a",
    mpasm: "0"
  },
  CCP2IP: {
    xc8: "BANKMASK(IPR2), 0, a",
    mpasm: "0"
  },
  CCP2M0: {
    xc8: "BANKMASK(CCP2CON), 0, a",
    mpasm: "0"
  },
  CCP2M1: {
    xc8: "BANKMASK(CCP2CON), 1, a",
    mpasm: "1"
  },
  CCP2M2: {
    xc8: "BANKMASK(CCP2CON), 2, a",
    mpasm: "2"
  },
  CCP2M3: {
    xc8: "BANKMASK(CCP2CON), 3, a",
    mpasm: "3"
  },
  CCP2X: {
    xc8: "BANKMASK(CCP2CON), 5, a",
    mpasm: "5"
  },
  CCP2Y: {
    xc8: "BANKMASK(CCP2CON), 4, a",
    mpasm: "4"
  },
  CFGS: {
    xc8: "BANKMASK(EECON1), 6, a",
    mpasm: "6"
  },
  CHS0: {
    xc8: "BANKMASK(ADCON0), 2, a",
    mpasm: "2"
  },
  CHS1: {
    xc8: "BANKMASK(ADCON0), 3, a",
    mpasm: "3"
  },
  CHS2: {
    xc8: "BANKMASK(ADCON0), 4, a",
    mpasm: "4"
  },
  CHS3: {
    xc8: "BANKMASK(ADCON0), 5, a",
    mpasm: "5"
  },
  CIS: {
    xc8: "BANKMASK(CMCON), 3, a",
    mpasm: "3"
  },
  CK: {
    xc8: "BANKMASK(PORTC), 6, a",
    mpasm: "6"
  },
  CKE: {
    xc8: "BANKMASK(SSPSTAT), 6, a",
    mpasm: "6"
  },
  CKP: {
    xc8: "BANKMASK(SSPCON1), 4, a",
    mpasm: "4"
  },
  CLKI: {
    xc8: "BANKMASK(PORTA), 7, a",
    mpasm: "7"
  },
  CLKO: {
    xc8: "BANKMASK(PORTA), 6, a",
    mpasm: "6"
  },
  CM0: {
    xc8: "BANKMASK(CMCON), 0, a",
    mpasm: "0"
  },
  CM1: {
    xc8: "BANKMASK(CMCON), 1, a",
    mpasm: "1"
  },
  CM2: {
    xc8: "BANKMASK(CMCON), 2, a",
    mpasm: "2"
  },
  CMIE: {
    xc8: "BANKMASK(PIE2), 6, a",
    mpasm: "6"
  },
  CMIF: {
    xc8: "BANKMASK(PIR2), 6, a",
    mpasm: "6"
  },
  CMIP: {
    xc8: "BANKMASK(IPR2), 6, a",
    mpasm: "6"
  },
  CREN: {
    xc8: "BANKMASK(RCSTA), 4, a",
    mpasm: "4"
  },
  CS: {
    xc8: "BANKMASK(PORTE), 2, a",
    mpasm: "2"
  },
  CSRC: {
    xc8: "BANKMASK(TXSTA), 7, a",
    mpasm: "7"
  },
  CVR0: {
    xc8: "BANKMASK(CVRCON), 0, a",
    mpasm: "0"
  },
  CVR1: {
    xc8: "BANKMASK(CVRCON), 1, a",
    mpasm: "1"
  },
  CVR2: {
    xc8: "BANKMASK(CVRCON), 2, a",
    mpasm: "2"
  },
  CVR3: {
    xc8: "BANKMASK(CVRCON), 3, a",
    mpasm: "3"
  },
  CVREF: {
    xc8: "BANKMASK(PORTA), 2, a",
    mpasm: "2"
  },
  CVREN: {
    xc8: "BANKMASK(CVRCON), 7, a",
    mpasm: "7"
  },
  CVROE: {
    xc8: "BANKMASK(CVRCON), 6, a",
    mpasm: "6"
  },
  CVRR: {
    xc8: "BANKMASK(CVRCON), 5, a",
    mpasm: "5"
  },
  CVRSS: {
    xc8: "BANKMASK(CVRCON), 4, a",
    mpasm: "4"
  },
  DC: {
    xc8: "BANKMASK(STATUS), 1, a",
    mpasm: "1"
  },
  DC1B0: {
    xc8: "BANKMASK(CCP1CON), 4, a",
    mpasm: "4"
  },
  DC1B1: {
    xc8: "BANKMASK(CCP1CON), 5, a",
    mpasm: "5"
  },
  DC2B0: {
    xc8: "BANKMASK(CCP2CON), 4, a",
    mpasm: "4"
  },
  DC2B1: {
    xc8: "BANKMASK(CCP2CON), 5, a",
    mpasm: "5"
  },
  DONE: {
    xc8: "BANKMASK(ADCON0), 1, a",
    mpasm: "1"
  },
  D_A: {
    xc8: "BANKMASK(SSPSTAT), 5, a",
    mpasm: "5"
  },
  D_NOT_A: {
    xc8: "BANKMASK(SSPSTAT), 5, a",
    mpasm: "5"
  },
  ECCPAS0: {
    xc8: "BANKMASK(ECCP1AS), 4, a",
    mpasm: "4"
  },
  ECCPAS1: {
    xc8: "BANKMASK(ECCP1AS), 5, a",
    mpasm: "5"
  },
  ECCPAS2: {
    xc8: "BANKMASK(ECCP1AS), 6, a",
    mpasm: "6"
  },
  ECCPASE: {
    xc8: "BANKMASK(ECCP1AS), 7, a",
    mpasm: "7"
  },
  EEIE: {
    xc8: "BANKMASK(PIE2), 4, a",
    mpasm: "4"
  },
  EEIF: {
    xc8: "BANKMASK(PIR2), 4, a",
    mpasm: "4"
  },
  EEIP: {
    xc8: "BANKMASK(IPR2), 4, a",
    mpasm: "4"
  },
  EEPGD: {
    xc8: "BANKMASK(EECON1), 7, a",
    mpasm: "7"
  },
  FERR: {
    xc8: "BANKMASK(RCSTA), 2, a",
    mpasm: "2"
  },
  FLT0: {
    xc8: "BANKMASK(PORTB), 0, a",
    mpasm: "0"
  },
  FLTS: {
    xc8: "BANKMASK(OSCCON), 2, a",
    mpasm: "2"
  },
  FREE: {
    xc8: "BANKMASK(EECON1), 4, a",
    mpasm: "4"
  },
  GCEN: {
    xc8: "BANKMASK(SSPCON2), 7, a",
    mpasm: "7"
  },
  GIE: {
    xc8: "BANKMASK(INTCON), 7, a",
    mpasm: "7"
  },
  GIEH: {
    xc8: "BANKMASK(INTCON), 7, a",
    mpasm: "7"
  },
  GIEL: {
    xc8: "BANKMASK(INTCON), 6, a",
    mpasm: "6"
  },
  GIE_GIEH: {
    xc8: "BANKMASK(INTCON), 7, a",
    mpasm: "7"
  },
  GO: {
    xc8: "BANKMASK(ADCON0), 1, a",
    mpasm: "1"
  },
  GO_DONE: {
    xc8: "BANKMASK(ADCON0), 1, a",
    mpasm: "1"
  },
  GO_NOT_DONE: {
    xc8: "BANKMASK(ADCON0), 1, a",
    mpasm: "1"
  },
  HLVDEN: {
    xc8: "BANKMASK(HLVDCON), 4, a",
    mpasm: "4"
  },
  HLVDIE: {
    xc8: "BANKMASK(PIE2), 2, a",
    mpasm: "2"
  },
  HLVDIF: {
    xc8: "BANKMASK(PIR2), 2, a",
    mpasm: "2"
  },
  HLVDIN: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  HLVDIP: {
    xc8: "BANKMASK(IPR2), 2, a",
    mpasm: "2"
  },
  HLVDL0: {
    xc8: "BANKMASK(HLVDCON), 0, a",
    mpasm: "0"
  },
  HLVDL1: {
    xc8: "BANKMASK(HLVDCON), 1, a",
    mpasm: "1"
  },
  HLVDL2: {
    xc8: "BANKMASK(HLVDCON), 2, a",
    mpasm: "2"
  },
  HLVDL3: {
    xc8: "BANKMASK(HLVDCON), 3, a",
    mpasm: "3"
  },
  IBF: {
    xc8: "BANKMASK(TRISE), 7, a",
    mpasm: "7"
  },
  IBOV: {
    xc8: "BANKMASK(TRISE), 5, a",
    mpasm: "5"
  },
  IDLEN: {
    xc8: "BANKMASK(OSCCON), 7, a",
    mpasm: "7"
  },
  INT0: {
    xc8: "BANKMASK(PORTB), 0, a",
    mpasm: "0"
  },
  INT0E: {
    xc8: "BANKMASK(INTCON), 4, a",
    mpasm: "4"
  },
  INT0F: {
    xc8: "BANKMASK(INTCON), 1, a",
    mpasm: "1"
  },
  INT0IE: {
    xc8: "BANKMASK(INTCON), 4, a",
    mpasm: "4"
  },
  INT0IF: {
    xc8: "BANKMASK(INTCON), 1, a",
    mpasm: "1"
  },
  INT1: {
    xc8: "BANKMASK(PORTB), 1, a",
    mpasm: "1"
  },
  INT1E: {
    xc8: "BANKMASK(INTCON3), 3, a",
    mpasm: "3"
  },
  INT1F: {
    xc8: "BANKMASK(INTCON3), 0, a",
    mpasm: "0"
  },
  INT1IE: {
    xc8: "BANKMASK(INTCON3), 3, a",
    mpasm: "3"
  },
  INT1IF: {
    xc8: "BANKMASK(INTCON3), 0, a",
    mpasm: "0"
  },
  INT1IP: {
    xc8: "BANKMASK(INTCON3), 6, a",
    mpasm: "6"
  },
  INT1P: {
    xc8: "BANKMASK(INTCON3), 6, a",
    mpasm: "6"
  },
  INT2: {
    xc8: "BANKMASK(PORTB), 2, a",
    mpasm: "2"
  },
  INT2E: {
    xc8: "BANKMASK(INTCON3), 4, a",
    mpasm: "4"
  },
  INT2F: {
    xc8: "BANKMASK(INTCON3), 1, a",
    mpasm: "1"
  },
  INT2IE: {
    xc8: "BANKMASK(INTCON3), 4, a",
    mpasm: "4"
  },
  INT2IF: {
    xc8: "BANKMASK(INTCON3), 1, a",
    mpasm: "1"
  },
  INT2IP: {
    xc8: "BANKMASK(INTCON3), 7, a",
    mpasm: "7"
  },
  INT2P: {
    xc8: "BANKMASK(INTCON3), 7, a",
    mpasm: "7"
  },
  INTEDG0: {
    xc8: "BANKMASK(INTCON2), 6, a",
    mpasm: "6"
  },
  INTEDG1: {
    xc8: "BANKMASK(INTCON2), 5, a",
    mpasm: "5"
  },
  INTEDG2: {
    xc8: "BANKMASK(INTCON2), 4, a",
    mpasm: "4"
  },
  INTSRC: {
    xc8: "BANKMASK(OSCTUNE), 7, a",
    mpasm: "7"
  },
  IOFS: {
    xc8: "BANKMASK(OSCCON), 2, a",
    mpasm: "2"
  },
  IPEN: {
    xc8: "BANKMASK(RCON), 7, a",
    mpasm: "7"
  },
  IRCF0: {
    xc8: "BANKMASK(OSCCON), 4, a",
    mpasm: "4"
  },
  IRCF1: {
    xc8: "BANKMASK(OSCCON), 5, a",
    mpasm: "5"
  },
  IRCF2: {
    xc8: "BANKMASK(OSCCON), 6, a",
    mpasm: "6"
  },
  IRVST: {
    xc8: "BANKMASK(HLVDCON), 5, a",
    mpasm: "5"
  },
  IVRST: {
    xc8: "BANKMASK(HLVDCON), 5, a",
    mpasm: "5"
  },
  KBI0: {
    xc8: "BANKMASK(PORTB), 4, a",
    mpasm: "4"
  },
  KBI1: {
    xc8: "BANKMASK(PORTB), 5, a",
    mpasm: "5"
  },
  KBI2: {
    xc8: "BANKMASK(PORTB), 6, a",
    mpasm: "6"
  },
  KBI3: {
    xc8: "BANKMASK(PORTB), 7, a",
    mpasm: "7"
  },
  LATA0: {
    xc8: "BANKMASK(LATA), 0, a",
    mpasm: "0"
  },
  LATA1: {
    xc8: "BANKMASK(LATA), 1, a",
    mpasm: "1"
  },
  LATA2: {
    xc8: "BANKMASK(LATA), 2, a",
    mpasm: "2"
  },
  LATA3: {
    xc8: "BANKMASK(LATA), 3, a",
    mpasm: "3"
  },
  LATA4: {
    xc8: "BANKMASK(LATA), 4, a",
    mpasm: "4"
  },
  LATA5: {
    xc8: "BANKMASK(LATA), 5, a",
    mpasm: "5"
  },
  LATA6: {
    xc8: "BANKMASK(LATA), 6, a",
    mpasm: "6"
  },
  LATA7: {
    xc8: "BANKMASK(LATA), 7, a",
    mpasm: "7"
  },
  LATB0: {
    xc8: "BANKMASK(LATB), 0, a",
    mpasm: "0"
  },
  LATB1: {
    xc8: "BANKMASK(LATB), 1, a",
    mpasm: "1"
  },
  LATB2: {
    xc8: "BANKMASK(LATB), 2, a",
    mpasm: "2"
  },
  LATB3: {
    xc8: "BANKMASK(LATB), 3, a",
    mpasm: "3"
  },
  LATB4: {
    xc8: "BANKMASK(LATB), 4, a",
    mpasm: "4"
  },
  LATB5: {
    xc8: "BANKMASK(LATB), 5, a",
    mpasm: "5"
  },
  LATB6: {
    xc8: "BANKMASK(LATB), 6, a",
    mpasm: "6"
  },
  LATB7: {
    xc8: "BANKMASK(LATB), 7, a",
    mpasm: "7"
  },
  LATC0: {
    xc8: "BANKMASK(LATC), 0, a",
    mpasm: "0"
  },
  LATC1: {
    xc8: "BANKMASK(LATC), 1, a",
    mpasm: "1"
  },
  LATC2: {
    xc8: "BANKMASK(LATC), 2, a",
    mpasm: "2"
  },
  LATC3: {
    xc8: "BANKMASK(LATC), 3, a",
    mpasm: "3"
  },
  LATC4: {
    xc8: "BANKMASK(LATC), 4, a",
    mpasm: "4"
  },
  LATC5: {
    xc8: "BANKMASK(LATC), 5, a",
    mpasm: "5"
  },
  LATC6: {
    xc8: "BANKMASK(LATC), 6, a",
    mpasm: "6"
  },
  LATC7: {
    xc8: "BANKMASK(LATC), 7, a",
    mpasm: "7"
  },
  LATD0: {
    xc8: "BANKMASK(LATD), 0, a",
    mpasm: "0"
  },
  LATD1: {
    xc8: "BANKMASK(LATD), 1, a",
    mpasm: "1"
  },
  LATD2: {
    xc8: "BANKMASK(LATD), 2, a",
    mpasm: "2"
  },
  LATD3: {
    xc8: "BANKMASK(LATD), 3, a",
    mpasm: "3"
  },
  LATD4: {
    xc8: "BANKMASK(LATD), 4, a",
    mpasm: "4"
  },
  LATD5: {
    xc8: "BANKMASK(LATD), 5, a",
    mpasm: "5"
  },
  LATD6: {
    xc8: "BANKMASK(LATD), 6, a",
    mpasm: "6"
  },
  LATD7: {
    xc8: "BANKMASK(LATD), 7, a",
    mpasm: "7"
  },
  LATE0: {
    xc8: "BANKMASK(LATE), 0, a",
    mpasm: "0"
  },
  LATE1: {
    xc8: "BANKMASK(LATE), 1, a",
    mpasm: "1"
  },
  LATE2: {
    xc8: "BANKMASK(LATE), 2, a",
    mpasm: "2"
  },
  LVDEN: {
    xc8: "BANKMASK(HLVDCON), 4, a",
    mpasm: "4"
  },
  LVDIE: {
    xc8: "BANKMASK(PIE2), 2, a",
    mpasm: "2"
  },
  LVDIF: {
    xc8: "BANKMASK(PIR2), 2, a",
    mpasm: "2"
  },
  LVDIN: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  LVDIP: {
    xc8: "BANKMASK(IPR2), 2, a",
    mpasm: "2"
  },
  LVDL0: {
    xc8: "BANKMASK(HLVDCON), 0, a",
    mpasm: "0"
  },
  LVDL1: {
    xc8: "BANKMASK(HLVDCON), 1, a",
    mpasm: "1"
  },
  LVDL2: {
    xc8: "BANKMASK(HLVDCON), 2, a",
    mpasm: "2"
  },
  LVDL3: {
    xc8: "BANKMASK(HLVDCON), 3, a",
    mpasm: "3"
  },
  LVV0: {
    xc8: "BANKMASK(HLVDCON), 0, a",
    mpasm: "0"
  },
  LVV1: {
    xc8: "BANKMASK(HLVDCON), 1, a",
    mpasm: "1"
  },
  LVV2: {
    xc8: "BANKMASK(HLVDCON), 2, a",
    mpasm: "2"
  },
  LVV3: {
    xc8: "BANKMASK(HLVDCON), 3, a",
    mpasm: "3"
  },
  MCLR: {
    xc8: "BANKMASK(PORTE), 3, a",
    mpasm: "3"
  },
  NOT_A: {
    xc8: "BANKMASK(SSPSTAT), 5, a",
    mpasm: "5"
  },
  NOT_ADDRESS: {
    xc8: "BANKMASK(SSPSTAT), 5, a",
    mpasm: "5"
  },
  NOT_BOR: {
    xc8: "BANKMASK(RCON), 0, a",
    mpasm: "0"
  },
  NOT_CS: {
    xc8: "BANKMASK(PORTE), 2, a",
    mpasm: "2"
  },
  NOT_DONE: {
    xc8: "BANKMASK(ADCON0), 1, a",
    mpasm: "1"
  },
  NOT_MCLR: {
    xc8: "BANKMASK(PORTE), 3, a",
    mpasm: "3"
  },
  NOT_PD: {
    xc8: "BANKMASK(RCON), 2, a",
    mpasm: "2"
  },
  NOT_POR: {
    xc8: "BANKMASK(RCON), 1, a",
    mpasm: "1"
  },
  NOT_RBPU: {
    xc8: "BANKMASK(INTCON2), 7, a",
    mpasm: "7"
  },
  NOT_RD: {
    xc8: "BANKMASK(PORTE), 0, a",
    mpasm: "0"
  },
  NOT_RI: {
    xc8: "BANKMASK(RCON), 4, a",
    mpasm: "4"
  },
  NOT_SS: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  NOT_T1SYNC: {
    xc8: "BANKMASK(T1CON), 2, a",
    mpasm: "2"
  },
  NOT_T3SYNC: {
    xc8: "BANKMASK(T3CON), 2, a",
    mpasm: "2"
  },
  NOT_TO: {
    xc8: "BANKMASK(RCON), 3, a",
    mpasm: "3"
  },
  NOT_W: {
    xc8: "BANKMASK(SSPSTAT), 2, a",
    mpasm: "2"
  },
  NOT_WR: {
    xc8: "BANKMASK(PORTE), 1, a",
    mpasm: "1"
  },
  NOT_WRITE: {
    xc8: "BANKMASK(SSPSTAT), 2, a",
    mpasm: "2"
  },
  OBF: {
    xc8: "BANKMASK(TRISE), 6, a",
    mpasm: "6"
  },
  OERR: {
    xc8: "BANKMASK(RCSTA), 1, a",
    mpasm: "1"
  },
  OSC1: {
    xc8: "BANKMASK(PORTA), 7, a",
    mpasm: "7"
  },
  OSC2: {
    xc8: "BANKMASK(PORTA), 6, a",
    mpasm: "6"
  },
  OSCFIE: {
    xc8: "BANKMASK(PIE2), 7, a",
    mpasm: "7"
  },
  OSCFIF: {
    xc8: "BANKMASK(PIR2), 7, a",
    mpasm: "7"
  },
  OSCFIP: {
    xc8: "BANKMASK(IPR2), 7, a",
    mpasm: "7"
  },
  OSTS: {
    xc8: "BANKMASK(OSCCON), 3, a",
    mpasm: "3"
  },
  OV: {
    xc8: "BANKMASK(STATUS), 3, a",
    mpasm: "3"
  },
  P1A: {
    xc8: "BANKMASK(PORTC), 2, a",
    mpasm: "2"
  },
  P1B: {
    xc8: "BANKMASK(PORTD), 5, a",
    mpasm: "5"
  },
  P1C: {
    xc8: "BANKMASK(PORTD), 6, a",
    mpasm: "6"
  },
  P1D: {
    xc8: "BANKMASK(PORTD), 7, a",
    mpasm: "7"
  },
  P1M0: {
    xc8: "BANKMASK(CCP1CON), 6, a",
    mpasm: "6"
  },
  P1M1: {
    xc8: "BANKMASK(CCP1CON), 7, a",
    mpasm: "7"
  },
  PCFG0: {
    xc8: "BANKMASK(ADCON1), 0, a",
    mpasm: "0"
  },
  PCFG1: {
    xc8: "BANKMASK(ADCON1), 1, a",
    mpasm: "1"
  },
  PCFG2: {
    xc8: "BANKMASK(ADCON1), 2, a",
    mpasm: "2"
  },
  PCFG3: {
    xc8: "BANKMASK(ADCON1), 3, a",
    mpasm: "3"
  },
  PD: {
    xc8: "BANKMASK(RCON), 2, a",
    mpasm: "2"
  },
  PDC0: {
    xc8: "BANKMASK(PWM1CON), 0, a",
    mpasm: "0"
  },
  PDC1: {
    xc8: "BANKMASK(PWM1CON), 1, a",
    mpasm: "1"
  },
  PDC2: {
    xc8: "BANKMASK(PWM1CON), 2, a",
    mpasm: "2"
  },
  PDC3: {
    xc8: "BANKMASK(PWM1CON), 3, a",
    mpasm: "3"
  },
  PDC4: {
    xc8: "BANKMASK(PWM1CON), 4, a",
    mpasm: "4"
  },
  PDC5: {
    xc8: "BANKMASK(PWM1CON), 5, a",
    mpasm: "5"
  },
  PDC6: {
    xc8: "BANKMASK(PWM1CON), 6, a",
    mpasm: "6"
  },
  PEIE: {
    xc8: "BANKMASK(INTCON), 6, a",
    mpasm: "6"
  },
  PEIE_GIEL: {
    xc8: "BANKMASK(INTCON), 6, a",
    mpasm: "6"
  },
  PEN: {
    xc8: "BANKMASK(SSPCON2), 2, a",
    mpasm: "2"
  },
  PGC: {
    xc8: "BANKMASK(PORTB), 6, a",
    mpasm: "6"
  },
  PGD: {
    xc8: "BANKMASK(PORTB), 7, a",
    mpasm: "7"
  },
  PGM: {
    xc8: "BANKMASK(PORTB), 5, a",
    mpasm: "5"
  },
  PLLEN: {
    xc8: "BANKMASK(OSCTUNE), 6, a",
    mpasm: "6"
  },
  POR: {
    xc8: "BANKMASK(RCON), 1, a",
    mpasm: "1"
  },
  PRSEN: {
    xc8: "BANKMASK(PWM1CON), 7, a",
    mpasm: "7"
  },
  PSA: {
    xc8: "BANKMASK(T0CON), 3, a",
    mpasm: "3"
  },
  PSP0: {
    xc8: "BANKMASK(PORTD), 0, a",
    mpasm: "0"
  },
  PSP1: {
    xc8: "BANKMASK(PORTD), 1, a",
    mpasm: "1"
  },
  PSP2: {
    xc8: "BANKMASK(PORTD), 2, a",
    mpasm: "2"
  },
  PSP3: {
    xc8: "BANKMASK(PORTD), 3, a",
    mpasm: "3"
  },
  PSP4: {
    xc8: "BANKMASK(PORTD), 4, a",
    mpasm: "4"
  },
  PSP5: {
    xc8: "BANKMASK(PORTD), 5, a",
    mpasm: "5"
  },
  PSP6: {
    xc8: "BANKMASK(PORTD), 6, a",
    mpasm: "6"
  },
  PSP7: {
    xc8: "BANKMASK(PORTD), 7, a",
    mpasm: "7"
  },
  PSPIE: {
    xc8: "BANKMASK(PIE1), 7, a",
    mpasm: "7"
  },
  PSPIF: {
    xc8: "BANKMASK(PIR1), 7, a",
    mpasm: "7"
  },
  PSPIP: {
    xc8: "BANKMASK(IPR1), 7, a",
    mpasm: "7"
  },
  PSPMODE: {
    xc8: "BANKMASK(TRISE), 4, a",
    mpasm: "4"
  },
  PSSAC0: {
    xc8: "BANKMASK(ECCP1AS), 2, a",
    mpasm: "2"
  },
  PSSAC1: {
    xc8: "BANKMASK(ECCP1AS), 3, a",
    mpasm: "3"
  },
  PSSBD0: {
    xc8: "BANKMASK(ECCP1AS), 0, a",
    mpasm: "0"
  },
  PSSBD1: {
    xc8: "BANKMASK(ECCP1AS), 1, a",
    mpasm: "1"
  },
  RA0: {
    xc8: "BANKMASK(PORTA), 0, a",
    mpasm: "0"
  },
  RA1: {
    xc8: "BANKMASK(PORTA), 1, a",
    mpasm: "1"
  },
  RA2: {
    xc8: "BANKMASK(PORTA), 2, a",
    mpasm: "2"
  },
  RA3: {
    xc8: "BANKMASK(PORTA), 3, a",
    mpasm: "3"
  },
  RA4: {
    xc8: "BANKMASK(PORTA), 4, a",
    mpasm: "4"
  },
  RA5: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  RA6: {
    xc8: "BANKMASK(PORTA), 6, a",
    mpasm: "6"
  },
  RA7: {
    xc8: "BANKMASK(PORTA), 7, a",
    mpasm: "7"
  },
  RB0: {
    xc8: "BANKMASK(PORTB), 0, a",
    mpasm: "0"
  },
  RB1: {
    xc8: "BANKMASK(PORTB), 1, a",
    mpasm: "1"
  },
  RB2: {
    xc8: "BANKMASK(PORTB), 2, a",
    mpasm: "2"
  },
  RB3: {
    xc8: "BANKMASK(PORTB), 3, a",
    mpasm: "3"
  },
  RB4: {
    xc8: "BANKMASK(PORTB), 4, a",
    mpasm: "4"
  },
  RB5: {
    xc8: "BANKMASK(PORTB), 5, a",
    mpasm: "5"
  },
  RB6: {
    xc8: "BANKMASK(PORTB), 6, a",
    mpasm: "6"
  },
  RB7: {
    xc8: "BANKMASK(PORTB), 7, a",
    mpasm: "7"
  },
  RBIE: {
    xc8: "BANKMASK(INTCON), 3, a",
    mpasm: "3"
  },
  RBIF: {
    xc8: "BANKMASK(INTCON), 0, a",
    mpasm: "0"
  },
  RBIP: {
    xc8: "BANKMASK(INTCON2), 0, a",
    mpasm: "0"
  },
  RBPU: {
    xc8: "BANKMASK(INTCON2), 7, a",
    mpasm: "7"
  },
  RC0: {
    xc8: "BANKMASK(PORTC), 0, a",
    mpasm: "0"
  },
  RC1: {
    xc8: "BANKMASK(PORTC), 1, a",
    mpasm: "1"
  },
  RC2: {
    xc8: "BANKMASK(PORTC), 2, a",
    mpasm: "2"
  },
  RC3: {
    xc8: "BANKMASK(PORTC), 3, a",
    mpasm: "3"
  },
  RC4: {
    xc8: "BANKMASK(PORTC), 4, a",
    mpasm: "4"
  },
  RC5: {
    xc8: "BANKMASK(PORTC), 5, a",
    mpasm: "5"
  },
  RC6: {
    xc8: "BANKMASK(PORTC), 6, a",
    mpasm: "6"
  },
  RC7: {
    xc8: "BANKMASK(PORTC), 7, a",
    mpasm: "7"
  },
  RCEN: {
    xc8: "BANKMASK(SSPCON2), 3, a",
    mpasm: "3"
  },
  RCIDL: {
    xc8: "BANKMASK(BAUDCON), 6, a",
    mpasm: "6"
  },
  RCIE: {
    xc8: "BANKMASK(PIE1), 5, a",
    mpasm: "5"
  },
  RCIF: {
    xc8: "BANKMASK(PIR1), 5, a",
    mpasm: "5"
  },
  RCIP: {
    xc8: "BANKMASK(IPR1), 5, a",
    mpasm: "5"
  },
  RCMT: {
    xc8: "BANKMASK(BAUDCON), 6, a",
    mpasm: "6"
  },
  RD: {
    xc8: "BANKMASK(EECON1), 0, a",
    mpasm: "0"
  },
  RD0: {
    xc8: "BANKMASK(PORTD), 0, a",
    mpasm: "0"
  },
  RD1: {
    xc8: "BANKMASK(PORTD), 1, a",
    mpasm: "1"
  },
  RD2: {
    xc8: "BANKMASK(PORTD), 2, a",
    mpasm: "2"
  },
  RD3: {
    xc8: "BANKMASK(PORTD), 3, a",
    mpasm: "3"
  },
  RD4: {
    xc8: "BANKMASK(PORTD), 4, a",
    mpasm: "4"
  },
  RD5: {
    xc8: "BANKMASK(PORTD), 5, a",
    mpasm: "5"
  },
  RD6: {
    xc8: "BANKMASK(PORTD), 6, a",
    mpasm: "6"
  },
  RD7: {
    xc8: "BANKMASK(PORTD), 7, a",
    mpasm: "7"
  },
  RE0: {
    xc8: "BANKMASK(PORTE), 0, a",
    mpasm: "0"
  },
  RE1: {
    xc8: "BANKMASK(PORTE), 1, a",
    mpasm: "1"
  },
  RE2: {
    xc8: "BANKMASK(PORTE), 2, a",
    mpasm: "2"
  },
  RE3: {
    xc8: "BANKMASK(PORTE), 3, a",
    mpasm: "3"
  },
  RI: {
    xc8: "BANKMASK(RCON), 4, a",
    mpasm: "4"
  },
  RSEN: {
    xc8: "BANKMASK(SSPCON2), 1, a",
    mpasm: "1"
  },
  RX: {
    xc8: "BANKMASK(PORTC), 7, a",
    mpasm: "7"
  },
  RX9: {
    xc8: "BANKMASK(RCSTA), 6, a",
    mpasm: "6"
  },
  RX9D: {
    xc8: "BANKMASK(RCSTA), 0, a",
    mpasm: "0"
  },
  RXDTP: {
    xc8: "BANKMASK(BAUDCON), 5, a",
    mpasm: "5"
  },
  R_NOT_W: {
    xc8: "BANKMASK(SSPSTAT), 2, a",
    mpasm: "2"
  },
  R_W: {
    xc8: "BANKMASK(SSPSTAT), 2, a",
    mpasm: "2"
  },
  SBOREN: {
    xc8: "BANKMASK(RCON), 6, a",
    mpasm: "6"
  },
  SCK: {
    xc8: "BANKMASK(PORTC), 3, a",
    mpasm: "3"
  },
  SCKP: {
    xc8: "BANKMASK(BAUDCON), 4, a",
    mpasm: "4"
  },
  SCL: {
    xc8: "BANKMASK(PORTC), 3, a",
    mpasm: "3"
  },
  SCS0: {
    xc8: "BANKMASK(OSCCON), 0, a",
    mpasm: "0"
  },
  SCS1: {
    xc8: "BANKMASK(OSCCON), 1, a",
    mpasm: "1"
  },
  SDA: {
    xc8: "BANKMASK(PORTC), 4, a",
    mpasm: "4"
  },
  SDI: {
    xc8: "BANKMASK(PORTC), 4, a",
    mpasm: "4"
  },
  SDO: {
    xc8: "BANKMASK(PORTC), 5, a",
    mpasm: "5"
  },
  SEN: {
    xc8: "BANKMASK(SSPCON2), 0, a",
    mpasm: "0"
  },
  SENDB: {
    xc8: "BANKMASK(TXSTA), 3, a",
    mpasm: "3"
  },
  SMP: {
    xc8: "BANKMASK(SSPSTAT), 7, a",
    mpasm: "7"
  },
  SP0: {
    xc8: "BANKMASK(STKPTR), 0, a",
    mpasm: "0"
  },
  SP1: {
    xc8: "BANKMASK(STKPTR), 1, a",
    mpasm: "1"
  },
  SP2: {
    xc8: "BANKMASK(STKPTR), 2, a",
    mpasm: "2"
  },
  SP3: {
    xc8: "BANKMASK(STKPTR), 3, a",
    mpasm: "3"
  },
  SP4: {
    xc8: "BANKMASK(STKPTR), 4, a",
    mpasm: "4"
  },
  SPEN: {
    xc8: "BANKMASK(RCSTA), 7, a",
    mpasm: "7"
  },
  SREN: {
    xc8: "BANKMASK(RCSTA), 5, a",
    mpasm: "5"
  },
  SS: {
    xc8: "BANKMASK(PORTA), 5, a",
    mpasm: "5"
  },
  SSPEN: {
    xc8: "BANKMASK(SSPCON1), 5, a",
    mpasm: "5"
  },
  SSPIE: {
    xc8: "BANKMASK(PIE1), 3, a",
    mpasm: "3"
  },
  SSPIF: {
    xc8: "BANKMASK(PIR1), 3, a",
    mpasm: "3"
  },
  SSPIP: {
    xc8: "BANKMASK(IPR1), 3, a",
    mpasm: "3"
  },
  SSPM0: {
    xc8: "BANKMASK(SSPCON1), 0, a",
    mpasm: "0"
  },
  SSPM1: {
    xc8: "BANKMASK(SSPCON1), 1, a",
    mpasm: "1"
  },
  SSPM2: {
    xc8: "BANKMASK(SSPCON1), 2, a",
    mpasm: "2"
  },
  SSPM3: {
    xc8: "BANKMASK(SSPCON1), 3, a",
    mpasm: "3"
  },
  SSPOV: {
    xc8: "BANKMASK(SSPCON1), 6, a",
    mpasm: "6"
  },
  STKFUL: {
    xc8: "BANKMASK(STKPTR), 7, a",
    mpasm: "7"
  },
  STKOVF: {
    xc8: "BANKMASK(STKPTR), 7, a",
    mpasm: "7"
  },
  STKUNF: {
    xc8: "BANKMASK(STKPTR), 6, a",
    mpasm: "6"
  },
  SWDTE: {
    xc8: "BANKMASK(WDTCON), 0, a",
    mpasm: "0"
  },
  SWDTEN: {
    xc8: "BANKMASK(WDTCON), 0, a",
    mpasm: "0"
  },
  SYNC: {
    xc8: "BANKMASK(TXSTA), 4, a",
    mpasm: "4"
  },
  T016BIT: {
    xc8: "BANKMASK(T0CON), 6, a",
    mpasm: "6"
  },
  T08BIT: {
    xc8: "BANKMASK(T0CON), 6, a",
    mpasm: "6"
  },
  T0CKI: {
    xc8: "BANKMASK(PORTA), 4, a",
    mpasm: "4"
  },
  T0CS: {
    xc8: "BANKMASK(T0CON), 5, a",
    mpasm: "5"
  },
  T0IE: {
    xc8: "BANKMASK(INTCON), 5, a",
    mpasm: "5"
  },
  T0IF: {
    xc8: "BANKMASK(INTCON), 2, a",
    mpasm: "2"
  },
  T0PS0: {
    xc8: "BANKMASK(T0CON), 0, a",
    mpasm: "0"
  },
  T0PS1: {
    xc8: "BANKMASK(T0CON), 1, a",
    mpasm: "1"
  },
  T0PS2: {
    xc8: "BANKMASK(T0CON), 2, a",
    mpasm: "2"
  },
  T0PS3: {
    xc8: "BANKMASK(T0CON), 3, a",
    mpasm: "3"
  },
  T0SE: {
    xc8: "BANKMASK(T0CON), 4, a",
    mpasm: "4"
  },
  T13CKI: {
    xc8: "BANKMASK(PORTC), 0, a",
    mpasm: "0"
  },
  T1CKI: {
    xc8: "BANKMASK(PORTC), 0, a",
    mpasm: "0"
  },
  T1CKPS0: {
    xc8: "BANKMASK(T1CON), 4, a",
    mpasm: "4"
  },
  T1CKPS1: {
    xc8: "BANKMASK(T1CON), 5, a",
    mpasm: "5"
  },
  T1OSCEN: {
    xc8: "BANKMASK(T1CON), 3, a",
    mpasm: "3"
  },
  T1OSI: {
    xc8: "BANKMASK(PORTC), 1, a",
    mpasm: "1"
  },
  T1OSO: {
    xc8: "BANKMASK(PORTC), 0, a",
    mpasm: "0"
  },
  T1RUN: {
    xc8: "BANKMASK(T1CON), 6, a",
    mpasm: "6"
  },
  T1SYNC: {
    xc8: "BANKMASK(T1CON), 2, a",
    mpasm: "2"
  },
  T2CKPS0: {
    xc8: "BANKMASK(T2CON), 0, a",
    mpasm: "0"
  },
  T2CKPS1: {
    xc8: "BANKMASK(T2CON), 1, a",
    mpasm: "1"
  },
  T2OUTPS0: {
    xc8: "BANKMASK(T2CON), 3, a",
    mpasm: "3"
  },
  T2OUTPS1: {
    xc8: "BANKMASK(T2CON), 4, a",
    mpasm: "4"
  },
  T2OUTPS2: {
    xc8: "BANKMASK(T2CON), 5, a",
    mpasm: "5"
  },
  T2OUTPS3: {
    xc8: "BANKMASK(T2CON), 6, a",
    mpasm: "6"
  },
  T3CCP1: {
    xc8: "BANKMASK(T3CON), 3, a",
    mpasm: "3"
  },
  T3CCP2: {
    xc8: "BANKMASK(T3CON), 6, a",
    mpasm: "6"
  },
  T3CKPS0: {
    xc8: "BANKMASK(T3CON), 4, a",
    mpasm: "4"
  },
  T3CKPS1: {
    xc8: "BANKMASK(T3CON), 5, a",
    mpasm: "5"
  },
  T3SYNC: {
    xc8: "BANKMASK(T3CON), 2, a",
    mpasm: "2"
  },
  TMR0IE: {
    xc8: "BANKMASK(INTCON), 5, a",
    mpasm: "5"
  },
  TMR0IF: {
    xc8: "BANKMASK(INTCON), 2, a",
    mpasm: "2"
  },
  TMR0IP: {
    xc8: "BANKMASK(INTCON2), 2, a",
    mpasm: "2"
  },
  TMR0ON: {
    xc8: "BANKMASK(T0CON), 7, a",
    mpasm: "7"
  },
  TMR1CS: {
    xc8: "BANKMASK(T1CON), 1, a",
    mpasm: "1"
  },
  TMR1IE: {
    xc8: "BANKMASK(PIE1), 0, a",
    mpasm: "0"
  },
  TMR1IF: {
    xc8: "BANKMASK(PIR1), 0, a",
    mpasm: "0"
  },
  TMR1IP: {
    xc8: "BANKMASK(IPR1), 0, a",
    mpasm: "0"
  },
  TMR1ON: {
    xc8: "BANKMASK(T1CON), 0, a",
    mpasm: "0"
  },
  TMR2IE: {
    xc8: "BANKMASK(PIE1), 1, a",
    mpasm: "1"
  },
  TMR2IF: {
    xc8: "BANKMASK(PIR1), 1, a",
    mpasm: "1"
  },
  TMR2IP: {
    xc8: "BANKMASK(IPR1), 1, a",
    mpasm: "1"
  },
  TMR2ON: {
    xc8: "BANKMASK(T2CON), 2, a",
    mpasm: "2"
  },
  TMR3CS: {
    xc8: "BANKMASK(T3CON), 1, a",
    mpasm: "1"
  },
  TMR3IE: {
    xc8: "BANKMASK(PIE2), 1, a",
    mpasm: "1"
  },
  TMR3IF: {
    xc8: "BANKMASK(PIR2), 1, a",
    mpasm: "1"
  },
  TMR3IP: {
    xc8: "BANKMASK(IPR2), 1, a",
    mpasm: "1"
  },
  TMR3ON: {
    xc8: "BANKMASK(T3CON), 0, a",
    mpasm: "0"
  },
  TO: {
    xc8: "BANKMASK(RCON), 3, a",
    mpasm: "3"
  },
  TOUTPS0: {
    xc8: "BANKMASK(T2CON), 3, a",
    mpasm: "3"
  },
  TOUTPS1: {
    xc8: "BANKMASK(T2CON), 4, a",
    mpasm: "4"
  },
  TOUTPS2: {
    xc8: "BANKMASK(T2CON), 5, a",
    mpasm: "5"
  },
  TOUTPS3: {
    xc8: "BANKMASK(T2CON), 6, a",
    mpasm: "6"
  },
  TRISA0: {
    xc8: "BANKMASK(TRISA), 0, a",
    mpasm: "0"
  },
  TRISA1: {
    xc8: "BANKMASK(TRISA), 1, a",
    mpasm: "1"
  },
  TRISA2: {
    xc8: "BANKMASK(TRISA), 2, a",
    mpasm: "2"
  },
  TRISA3: {
    xc8: "BANKMASK(TRISA), 3, a",
    mpasm: "3"
  },
  TRISA4: {
    xc8: "BANKMASK(TRISA), 4, a",
    mpasm: "4"
  },
  TRISA5: {
    xc8: "BANKMASK(TRISA), 5, a",
    mpasm: "5"
  },
  TRISA6: {
    xc8: "BANKMASK(TRISA), 6, a",
    mpasm: "6"
  },
  TRISA7: {
    xc8: "BANKMASK(TRISA), 7, a",
    mpasm: "7"
  },
  TRISB0: {
    xc8: "BANKMASK(TRISB), 0, a",
    mpasm: "0"
  },
  TRISB1: {
    xc8: "BANKMASK(TRISB), 1, a",
    mpasm: "1"
  },
  TRISB2: {
    xc8: "BANKMASK(TRISB), 2, a",
    mpasm: "2"
  },
  TRISB3: {
    xc8: "BANKMASK(TRISB), 3, a",
    mpasm: "3"
  },
  TRISB4: {
    xc8: "BANKMASK(TRISB), 4, a",
    mpasm: "4"
  },
  TRISB5: {
    xc8: "BANKMASK(TRISB), 5, a",
    mpasm: "5"
  },
  TRISB6: {
    xc8: "BANKMASK(TRISB), 6, a",
    mpasm: "6"
  },
  TRISB7: {
    xc8: "BANKMASK(TRISB), 7, a",
    mpasm: "7"
  },
  TRISC0: {
    xc8: "BANKMASK(TRISC), 0, a",
    mpasm: "0"
  },
  TRISC1: {
    xc8: "BANKMASK(TRISC), 1, a",
    mpasm: "1"
  },
  TRISC2: {
    xc8: "BANKMASK(TRISC), 2, a",
    mpasm: "2"
  },
  TRISC3: {
    xc8: "BANKMASK(TRISC), 3, a",
    mpasm: "3"
  },
  TRISC4: {
    xc8: "BANKMASK(TRISC), 4, a",
    mpasm: "4"
  },
  TRISC5: {
    xc8: "BANKMASK(TRISC), 5, a",
    mpasm: "5"
  },
  TRISC6: {
    xc8: "BANKMASK(TRISC), 6, a",
    mpasm: "6"
  },
  TRISC7: {
    xc8: "BANKMASK(TRISC), 7, a",
    mpasm: "7"
  },
  TRISD0: {
    xc8: "BANKMASK(TRISD), 0, a",
    mpasm: "0"
  },
  TRISD1: {
    xc8: "BANKMASK(TRISD), 1, a",
    mpasm: "1"
  },
  TRISD2: {
    xc8: "BANKMASK(TRISD), 2, a",
    mpasm: "2"
  },
  TRISD3: {
    xc8: "BANKMASK(TRISD), 3, a",
    mpasm: "3"
  },
  TRISD4: {
    xc8: "BANKMASK(TRISD), 4, a",
    mpasm: "4"
  },
  TRISD5: {
    xc8: "BANKMASK(TRISD), 5, a",
    mpasm: "5"
  },
  TRISD6: {
    xc8: "BANKMASK(TRISD), 6, a",
    mpasm: "6"
  },
  TRISD7: {
    xc8: "BANKMASK(TRISD), 7, a",
    mpasm: "7"
  },
  TRISE0: {
    xc8: "BANKMASK(TRISE), 0, a",
    mpasm: "0"
  },
  TRISE1: {
    xc8: "BANKMASK(TRISE), 1, a",
    mpasm: "1"
  },
  TRISE2: {
    xc8: "BANKMASK(TRISE), 2, a",
    mpasm: "2"
  },
  TRMT: {
    xc8: "BANKMASK(TXSTA), 1, a",
    mpasm: "1"
  },
  TUN0: {
    xc8: "BANKMASK(OSCTUNE), 0, a",
    mpasm: "0"
  },
  TUN1: {
    xc8: "BANKMASK(OSCTUNE), 1, a",
    mpasm: "1"
  },
  TUN2: {
    xc8: "BANKMASK(OSCTUNE), 2, a",
    mpasm: "2"
  },
  TUN3: {
    xc8: "BANKMASK(OSCTUNE), 3, a",
    mpasm: "3"
  },
  TUN4: {
    xc8: "BANKMASK(OSCTUNE), 4, a",
    mpasm: "4"
  },
  TX: {
    xc8: "BANKMASK(PORTC), 6, a",
    mpasm: "6"
  },
  TX9: {
    xc8: "BANKMASK(TXSTA), 6, a",
    mpasm: "6"
  },
  TX9D: {
    xc8: "BANKMASK(TXSTA), 0, a",
    mpasm: "0"
  },
  TXCKP: {
    xc8: "BANKMASK(BAUDCON), 4, a",
    mpasm: "4"
  },
  TXEN: {
    xc8: "BANKMASK(TXSTA), 5, a",
    mpasm: "5"
  },
  TXIE: {
    xc8: "BANKMASK(PIE1), 4, a",
    mpasm: "4"
  },
  TXIF: {
    xc8: "BANKMASK(PIR1), 4, a",
    mpasm: "4"
  },
  TXIP: {
    xc8: "BANKMASK(IPR1), 4, a",
    mpasm: "4"
  },
  UA: {
    xc8: "BANKMASK(SSPSTAT), 1, a",
    mpasm: "1"
  },
  VCFG0: {
    xc8: "BANKMASK(ADCON1), 4, a",
    mpasm: "4"
  },
  VCFG1: {
    xc8: "BANKMASK(ADCON1), 5, a",
    mpasm: "5"
  },
  VDIRMAG: {
    xc8: "BANKMASK(HLVDCON), 7, a",
    mpasm: "7"
  },
  VPP: {
    xc8: "BANKMASK(PORTE), 3, a",
    mpasm: "3"
  },
  VREFN: {
    xc8: "BANKMASK(PORTA), 2, a",
    mpasm: "2"
  },
  VREFP: {
    xc8: "BANKMASK(PORTA), 3, a",
    mpasm: "3"
  },
  WCOL: {
    xc8: "BANKMASK(SSPCON1), 7, a",
    mpasm: "7"
  },
  WR: {
    xc8: "BANKMASK(EECON1), 1, a",
    mpasm: "1"
  },
  WREN: {
    xc8: "BANKMASK(EECON1), 2, a",
    mpasm: "2"
  },
  WRERR: {
    xc8: "BANKMASK(EECON1), 3, a",
    mpasm: "3"
  },
  WUE: {
    xc8: "BANKMASK(BAUDCON), 1, a",
    mpasm: "1"
  }
};

// src/pic18/define/same.json
var same_default = {
  w: "0",
  f: "1",
  b: "1",
  c: "0",
  a: "0",
  PORTA: "0F80h",
  PORTB: "0F81h",
  PORTC: "0F82h",
  PORTD: "0F83h",
  PORTE: "0F84h",
  LATA: "0F89h",
  LATB: "0F8Ah",
  LATC: "0F8Bh",
  LATD: "0F8Ch",
  LATE: "0F8Dh",
  TRISA: "0F92h",
  TRISB: "0F93h",
  TRISC: "0F94h",
  TRISD: "0F95h",
  TRISE: "0F96h",
  OSCTUNE: "0F9Bh",
  PIE1: "0F9Dh",
  PIR1: "0F9Eh",
  IPR1: "0F9Fh",
  PIE2: "0FA0h",
  PIR2: "0FA1h",
  IPR2: "0FA2h",
  EECON1: "0FA6h",
  EECON2: "0FA7h",
  EEDATA: "0FA8h",
  EEADR: "0FA9h",
  RCSTA: "0FABh",
  TXSTA: "0FACh",
  TXREG: "0FADh",
  RCREG: "0FAEh",
  SPBRG: "0FAFh",
  SPBRGH: "0FB0h",
  T3CON: "0FB1h",
  TMR3: "0FB2h",
  TMR3L: "0FB2h",
  TMR3H: "0FB3h",
  CMCON: "0FB4h",
  CVRCON: "0FB5h",
  ECCP1AS: "0FB6h",
  PWM1CON: "0FB7h",
  BAUDCON: "0FB8h",
  CCP2CON: "0FBAh",
  CCPR2: "0FBBh",
  CCPR2L: "0FBBh",
  CCPR2H: "0FBCh",
  CCP1CON: "0FBDh",
  CCPR1: "0FBEh",
  CCPR1L: "0FBEh",
  CCPR1H: "0FBFh",
  ADCON2: "0FC0h",
  ADCON1: "0FC1h",
  ADCON0: "0FC2h",
  ADRES: "0FC3h",
  ADRESL: "0FC3h",
  ADRESH: "0FC4h",
  SSPCON2: "0FC5h",
  SSPCON1: "0FC6h",
  SSPSTAT: "0FC7h",
  SSPADD: "0FC8h",
  SSPBUF: "0FC9h",
  T2CON: "0FCAh",
  PR2: "0FCBh",
  TMR2: "0FCCh",
  T1CON: "0FCDh",
  TMR1: "0FCEh",
  TMR1L: "0FCEh",
  TMR1H: "0FCFh",
  RCON: "0FD0h",
  WDTCON: "0FD1h",
  HLVDCON: "0FD2h",
  OSCCON: "0FD3h",
  T0CON: "0FD5h",
  TMR0: "0FD6h",
  TMR0L: "0FD6h",
  TMR0H: "0FD7h",
  STATUS: "0FD8h",
  FSR2: "0FD9h",
  FSR2L: "0FD9h",
  FSR2H: "0FDAh",
  PLUSW2: "0FDBh",
  PREINC2: "0FDCh",
  POSTDEC2: "0FDDh",
  POSTINC2: "0FDEh",
  INDF2: "0FDFh",
  BSR: "0FE0h",
  FSR1: "0FE1h",
  FSR1L: "0FE1h",
  FSR1H: "0FE2h",
  PLUSW1: "0FE3h",
  PREINC1: "0FE4h",
  POSTDEC1: "0FE5h",
  POSTINC1: "0FE6h",
  INDF1: "0FE7h",
  WREG: "0FE8h",
  FSR0: "0FE9h",
  FSR0L: "0FE9h",
  FSR0H: "0FEAh",
  PLUSW0: "0FEBh",
  PREINC0: "0FECh",
  POSTDEC0: "0FEDh",
  POSTINC0: "0FEEh",
  INDF0: "0FEFh",
  INTCON3: "0FF0h",
  INTCON2: "0FF1h",
  INTCON: "0FF2h",
  PROD: "0FF3h",
  PRODL: "0FF3h",
  PRODH: "0FF4h",
  TABLAT: "0FF5h",
  TBLPTR: "0FF6h",
  TBLPTRL: "0FF6h",
  TBLPTRH: "0FF7h",
  TBLPTRU: "0FF8h",
  PCL: "0FF9h",
  PCLATH: "0FFAh",
  PCLATU: "0FFBh",
  STKPTR: "0FFCh",
  TOS: "0FFDh",
  TOSL: "0FFDh",
  TOSH: "0FFEh",
  TOSU: "0FFFh"
};

// src/pic18/define/mpasm.json
var mpasm_default = {
  ECCPAS: "0FB6h",
  ECCP1DEL: "0FB7h",
  BAUDCTL: "0FB8h",
  LVDCON: "0FD2h",
  PC: "0FF9h",
  C1OUT_PORTA: "4",
  C2OUT_PORTA: "5",
  CCP2_PORTB: "3",
  CCP2_PORTC: "1",
  RD16: "7",
  C1OUT_CMCON: "6",
  C2OUT_CMCON: "7",
  S: "3",
  P: "4",
  R: "2",
  D: "5",
  C: "0",
  Z: "2",
  N: "4",
  _CONFIG1H: "0300001h",
  _CONFIG2L: "0300002h",
  _CONFIG2H: "0300003h",
  _CONFIG3H: "0300005h",
  _CONFIG4L: "0300006h",
  _CONFIG5L: "0300008h",
  _CONFIG5H: "0300009h",
  _CONFIG6L: "030000Ah",
  _CONFIG6H: "030000Bh",
  _CONFIG7L: "030000Ch",
  _CONFIG7H: "030000Dh",
  _OSC_LP_1H: "0F0h",
  _OSC_XT_1H: "0F1h",
  _OSC_HS_1H: "0F2h",
  _OSC_RC_1H: "0F3h",
  _OSC_EC_1H: "0F4h",
  _OSC_ECIO6_1H: "0F5h",
  _OSC_HSPLL_1H: "0F6h",
  _OSC_RCIO6_1H: "0F7h",
  _OSC_INTIO67_1H: "0F8h",
  _OSC_INTIO7_1H: "0F9h",
  _FCMEN_OFF_1H: "0BFh",
  _FCMEN_ON_1H: "0FFh",
  _IESO_OFF_1H: "07Fh",
  _IESO_ON_1H: "0FFh",
  _PWRT_ON_2L: "0FEh",
  _PWRT_OFF_2L: "0FFh",
  _BOREN_OFF_2L: "0F9h",
  _BOREN_ON_2L: "0FBh",
  _BOREN_NOSLP_2L: "0FDh",
  _BOREN_SBORDIS_2L: "0FFh",
  _BORV_0_2L: "0E7h",
  _BORV_1_2L: "0EFh",
  _BORV_2_2L: "0F7h",
  _BORV_3_2L: "0FFh",
  _WDT_OFF_2H: "0FEh",
  _WDT_ON_2H: "0FFh",
  _WDTPS_1_2H: "0E1h",
  _WDTPS_2_2H: "0E3h",
  _WDTPS_4_2H: "0E5h",
  _WDTPS_8_2H: "0E7h",
  _WDTPS_16_2H: "0E9h",
  _WDTPS_32_2H: "0EBh",
  _WDTPS_64_2H: "0EDh",
  _WDTPS_128_2H: "0EFh",
  _WDTPS_256_2H: "0F1h",
  _WDTPS_512_2H: "0F3h",
  _WDTPS_1024_2H: "0F5h",
  _WDTPS_2048_2H: "0F7h",
  _WDTPS_4096_2H: "0F9h",
  _WDTPS_8192_2H: "0FBh",
  _WDTPS_16384_2H: "0FDh",
  _WDTPS_32768_2H: "0FFh",
  _CCP2MX_PORTBE_3H: "0FEh",
  _CCP2MX_PORTC_3H: "0FFh",
  _PBADEN_OFF_3H: "0FDh",
  _PBADEN_ON_3H: "0FFh",
  _LPT1OSC_OFF_3H: "0FBh",
  _LPT1OSC_ON_3H: "0FFh",
  _MCLRE_OFF_3H: "07Fh",
  _MCLRE_ON_3H: "0FFh",
  _STVREN_OFF_4L: "0FEh",
  _STVREN_ON_4L: "0FFh",
  _LVP_OFF_4L: "0FBh",
  _LVP_ON_4L: "0FFh",
  _XINST_OFF_4L: "0BFh",
  _XINST_ON_4L: "0FFh",
  _DEBUG_ON_4L: "07Fh",
  _DEBUG_OFF_4L: "0FFh",
  _CP0_ON_5L: "0FEh",
  _CP0_OFF_5L: "0FFh",
  _CP1_ON_5L: "0FDh",
  _CP1_OFF_5L: "0FFh",
  _CP2_ON_5L: "0FBh",
  _CP2_OFF_5L: "0FFh",
  _CP3_ON_5L: "0F7h",
  _CP3_OFF_5L: "0FFh",
  _CPB_ON_5H: "0BFh",
  _CPB_OFF_5H: "0FFh",
  _CPD_ON_5H: "07Fh",
  _CPD_OFF_5H: "0FFh",
  _WRT0_ON_6L: "0FEh",
  _WRT0_OFF_6L: "0FFh",
  _WRT1_ON_6L: "0FDh",
  _WRT1_OFF_6L: "0FFh",
  _WRT2_ON_6L: "0FBh",
  _WRT2_OFF_6L: "0FFh",
  _WRT3_ON_6L: "0F7h",
  _WRT3_OFF_6L: "0FFh",
  _WRTC_ON_6H: "0DFh",
  _WRTC_OFF_6H: "0FFh",
  _WRTB_ON_6H: "0BFh",
  _WRTB_OFF_6H: "0FFh",
  _WRTD_ON_6H: "07Fh",
  _WRTD_OFF_6H: "0FFh",
  _EBTR0_ON_7L: "0FEh",
  _EBTR0_OFF_7L: "0FFh",
  _EBTR1_ON_7L: "0FDh",
  _EBTR1_OFF_7L: "0FFh",
  _EBTR2_ON_7L: "0FBh",
  _EBTR2_OFF_7L: "0FFh",
  _EBTR3_ON_7L: "0F7h",
  _EBTR3_OFF_7L: "0FFh",
  _EBTRB_ON_7H: "0BFh",
  _EBTRB_OFF_7H: "0FFh",
  _DEVID1: "03FFFFEh",
  _DEVID2: "03FFFFFh",
  _IDLOC0: "0200000h",
  _IDLOC1: "0200001h",
  _IDLOC2: "0200002h",
  _IDLOC3: "0200003h",
  _IDLOC4: "0200004h",
  _IDLOC5: "0200005h",
  _IDLOC6: "0200006h",
  _IDLOC7: "0200007h"
};

// src/pic18/define/xc8.json
var xc8_default = {
  PCLAT: "0FF9h",
  PAGEMASK: "(addr) ((addr) and 0FFFFFh)",
  BANKMASK: "(addr) ((addr) and 0FFh)",
  BRGH1: "BANKMASK(TXSTA), 2, a",
  C1OUT: "BANKMASK(CMCON), 6, a",
  C2OUT: "BANKMASK(CMCON), 7, a",
  CARRY: "BANKMASK(STATUS), 0, a",
  CCP10: "BANKMASK(PORTE), 2, a",
  CCP2_PA2: "BANKMASK(PORTB), 3, a",
  CCP9E: "BANKMASK(PORTE), 3, a",
  CHSN3: "BANKMASK(ADCON1), 3, a",
  CMEN0: "BANKMASK(CMCON), 0, a",
  CMEN1: "BANKMASK(CMCON), 1, a",
  CMEN2: "BANKMASK(CMCON), 2, a",
  CSRC1: "BANKMASK(TXSTA), 7, a",
  CVROEN: "BANKMASK(CVRCON), 6, a",
  DA: "BANKMASK(SSPSTAT), 5, a",
  DT: "BANKMASK(PORTC), 7, a",
  D_nA: "BANKMASK(SSPSTAT), 5, a",
  EBDIS: "BANKMASK(PR2), 7, a",
  EEFS: "BANKMASK(EECON1), 6, a",
  GODONE: "BANKMASK(ADCON0), 1, a",
  GO_nDONE: "BANKMASK(ADCON0), 1, a",
  LA0: "BANKMASK(LATA), 0, a",
  LA1: "BANKMASK(LATA), 1, a",
  LA2: "BANKMASK(LATA), 2, a",
  LA3: "BANKMASK(LATA), 3, a",
  LA4: "BANKMASK(LATA), 4, a",
  LA5: "BANKMASK(LATA), 5, a",
  LA6: "BANKMASK(LATA), 6, a",
  LA7: "BANKMASK(LATA), 7, a",
  LB0: "BANKMASK(LATB), 0, a",
  LB1: "BANKMASK(LATB), 1, a",
  LB2: "BANKMASK(LATB), 2, a",
  LB3: "BANKMASK(LATB), 3, a",
  LB4: "BANKMASK(LATB), 4, a",
  LB5: "BANKMASK(LATB), 5, a",
  LB6: "BANKMASK(LATB), 6, a",
  LB7: "BANKMASK(LATB), 7, a",
  LC0: "BANKMASK(LATC), 0, a",
  LC1: "BANKMASK(LATC), 1, a",
  LC2: "BANKMASK(LATC), 2, a",
  LC3: "BANKMASK(LATC), 3, a",
  LC4: "BANKMASK(LATC), 4, a",
  LC5: "BANKMASK(LATC), 5, a",
  LC6: "BANKMASK(LATC), 6, a",
  LC7: "BANKMASK(LATC), 7, a",
  LD0: "BANKMASK(LATD), 0, a",
  LD1: "BANKMASK(LATD), 1, a",
  LD2: "BANKMASK(LATD), 2, a",
  LD3: "BANKMASK(LATD), 3, a",
  LD4: "BANKMASK(LATD), 4, a",
  LD5: "BANKMASK(LATD), 5, a",
  LD6: "BANKMASK(LATD), 6, a",
  LD7: "BANKMASK(LATD), 7, a",
  LE0: "BANKMASK(LATE), 0, a",
  LE1: "BANKMASK(LATE), 1, a",
  LE2: "BANKMASK(LATE), 2, a",
  NEGATIVE: "BANKMASK(STATUS), 4, a",
  OVERFLOW: "BANKMASK(STATUS), 3, a",
  PA1: "BANKMASK(PORTC), 2, a",
  PA2: "BANKMASK(PORTC), 1, a",
  PB2: "BANKMASK(PORTE), 2, a",
  PC2: "BANKMASK(PORTE), 1, a",
  PC3E: "BANKMASK(PORTE), 3, a",
  PD2: "BANKMASK(PORTE), 0, a",
  RC1IE: "BANKMASK(PIE1), 5, a",
  RC1IF: "BANKMASK(PIR1), 5, a",
  RC1IP: "BANKMASK(IPR1), 5, a",
  RC8_9: "BANKMASK(RCSTA), 6, a",
  RC9: "BANKMASK(RCSTA), 6, a",
  RCD8: "BANKMASK(RCSTA), 0, a",
  RD163: "BANKMASK(T3CON), 7, a",
  RDE: "BANKMASK(PORTE), 0, a",
  RJPU: "BANKMASK(PORTA), 7, a",
  RW: "BANKMASK(SSPSTAT), 2, a",
  RXCKP: "BANKMASK(BAUDCON), 5, a",
  R_nW: "BANKMASK(SSPSTAT), 2, a",
  SENDB1: "BANKMASK(TXSTA), 3, a",
  SOSCEN: "BANKMASK(T1CON), 3, a",
  SOSCEN3: "BANKMASK(T3CON), 3, a",
  SRENA: "BANKMASK(RCSTA), 5, a",
  SS2: "BANKMASK(PORTD), 7, a",
  START: "BANKMASK(SSPSTAT), 3, a",
  STOP: "BANKMASK(SSPSTAT), 4, a",
  SYNC1: "BANKMASK(TXSTA), 4, a",
  T1RD16: "BANKMASK(T1CON), 7, a",
  T3RD16: "BANKMASK(T3CON), 7, a",
  TRMT1: "BANKMASK(TXSTA), 1, a",
  TX1IE: "BANKMASK(PIE1), 4, a",
  TX1IF: "BANKMASK(PIR1), 4, a",
  TX1IP: "BANKMASK(IPR1), 4, a",
  TX8_9: "BANKMASK(TXSTA), 6, a",
  TX91: "BANKMASK(TXSTA), 6, a",
  TX9D1: "BANKMASK(TXSTA), 0, a",
  TXD8: "BANKMASK(TXSTA), 0, a",
  TXEN1: "BANKMASK(TXSTA), 5, a",
  ULPWUIN: "BANKMASK(PORTA), 0, a",
  VCFG01: "BANKMASK(ADCON1), 4, a",
  VCFG11: "BANKMASK(ADCON1), 5, a",
  W4E: "BANKMASK(BAUDCON), 1, a",
  WAIT0: "BANKMASK(PR2), 4, a",
  WAIT1: "BANKMASK(PR2), 5, a",
  WM0: "BANKMASK(PR2), 0, a",
  WM1: "BANKMASK(PR2), 1, a",
  WRE: "BANKMASK(PORTE), 1, a",
  ZERO: "BANKMASK(STATUS), 2, a",
  nA: "BANKMASK(SSPSTAT), 5, a",
  nADDRESS: "BANKMASK(SSPSTAT), 5, a",
  nBOR: "BANKMASK(RCON), 0, a",
  nCS: "BANKMASK(PORTE), 2, a",
  nDONE: "BANKMASK(ADCON0), 1, a",
  nMCLR: "BANKMASK(PORTE), 3, a",
  nPD: "BANKMASK(RCON), 2, a",
  nPOR: "BANKMASK(RCON), 1, a",
  nRBPU: "BANKMASK(INTCON2), 7, a",
  nRD: "BANKMASK(PORTE), 0, a",
  nRI: "BANKMASK(RCON), 4, a",
  nSS: "BANKMASK(PORTA), 5, a",
  nT1SYNC: "BANKMASK(T1CON), 2, a",
  nT3SYNC: "BANKMASK(T3CON), 2, a",
  nTO: "BANKMASK(RCON), 3, a",
  nW: "BANKMASK(SSPSTAT), 2, a",
  nWR: "BANKMASK(PORTE), 1, a",
  nWRITE: "BANKMASK(SSPSTAT), 2, a",
  SPACE_CODE: "0",
  SPACE_DATA: "1",
  SPACE_EEPROM: "3"
};

// src/pic18/define.ts
var PIC_DEFINE_COMPLETIONS = [
  ...Object.entries(same_default).map(([label, value]) => {
    const ci = new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Constant);
    ci.detail = value;
    ci.insertText = label;
    ci.documentation = new import_vscode2.MarkdownString(`#### ${label}
Same value in both assemblers.

\`${value}\``);
    return ci;
  }),
  ...Object.entries(difference_default).map(([label, value]) => {
    const ci = new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Constant);
    ci.detail = `(different) ${value.xc8} or ${value.mpasm}`;
    ci.insertText = label;
    ci.documentation = new import_vscode2.MarkdownString(`#### ${label}
Different value depending on the assembler.

- MPASM: \`${value.mpasm}\`
- XC8: \`${value.xc8}\``);
    return ci;
  }),
  ...Object.entries(mpasm_default).map(([label, value]) => {
    const ci = new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Constant);
    ci.detail = `(mpasm) ${value}`;
    ci.insertText = label;
    ci.documentation = new import_vscode2.MarkdownString(`#### ${label}
Only defined in MPASM.

\`${value}\``);
    return ci;
  }),
  ...Object.entries(xc8_default).map(([label, value]) => {
    const ci = new import_vscode2.CompletionItem(label, import_vscode2.CompletionItemKind.Constant);
    ci.detail = `(xc8) ${value}`;
    ci.insertText = label;
    ci.documentation = new import_vscode2.MarkdownString(`#### ${label}
Only defined in XC8.

\`${value}\``);
    return ci;
  })
];
var PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT = PIC_DEFINE_COMPLETIONS.map((ci) => {
  ci.sortText = `zzz${ci.label}`;
  return ci;
});

// src/resource/label/completion.ts
var import_vscode4 = require("vscode");

// src/utils/getFileId.ts
var import_vscode3 = require("vscode");
function getFileId(uri) {
  return import_vscode3.workspace.asRelativePath(uri, false).toLowerCase();
}

// src/resource/label/data.ts
var DataManager = class {
  get fileMapData() {
    return this._fileMapData;
  }
  get labelNameMapData() {
    return this._labelNameMapData;
  }
  get branchLabelFileMapData() {
    return this._branchLabelFileMapData;
  }
  constructor() {
    this._fileMapData = /* @__PURE__ */ new Map();
    this._labelNameMapData = /* @__PURE__ */ new Map();
    this._branchLabelFileMapData = /* @__PURE__ */ new Map();
  }
  labelEquals(a, b) {
    return getFileId(a.uri) === getFileId(b.uri) && a.position.isEqual(b.position) && a.value.name === b.value.name && a.value.comment === b.value.comment && a.value.isExternal === b.value.isExternal;
  }
  push(label, mode) {
    if (mode === void 0 || mode === "filenameOnly") {
      const labelFileUri = getFileId(label.uri);
      const filenameMap = this._fileMapData.get(labelFileUri);
      if (filenameMap) filenameMap.push(label);
      else this._fileMapData.set(labelFileUri, [label]);
    }
    if (mode === void 0 || mode === "labelNameOnly") {
      const labelName = label.value.name;
      const labelNameMap = this._labelNameMapData.get(labelName);
      if (labelNameMap) labelNameMap.push(label);
      else this._labelNameMapData.set(labelName, [label]);
    }
  }
  remove(label, mode) {
    if (mode === void 0 || mode === "filenameOnly") {
      const labelFileUri = getFileId(label.uri);
      const filenameMap = this._fileMapData.get(labelFileUri);
      if (filenameMap) {
        filenameMap.splice(filenameMap.indexOf(label), 1);
        if (filenameMap.length === 0) this._fileMapData.delete(labelFileUri);
      }
    }
    if (mode === void 0 || mode === "labelNameOnly") {
      const labelName = label.value.name;
      const labelNameMap = this._labelNameMapData.get(labelName);
      if (labelNameMap) {
        labelNameMap.splice(labelNameMap.indexOf(label), 1);
        if (labelNameMap.length === 0) this._labelNameMapData.delete(labelName);
      }
    }
    const { name, isExternal } = label.value;
    if (isExternal) {
      const nameMap = this._labelNameMapData.get(name);
      label.value.exists = nameMap ? nameMap.some((l) => !l.value.isExternal) : false;
    }
  }
  clear() {
    this._fileMapData.clear();
    this._labelNameMapData.clear();
  }
  setLabelsOfUri(uri, labels) {
    if (labels.length === 0) {
      this.removeLabelsOfUri(uri);
      return;
    }
    const fileUri = getFileId(uri);
    const existingLabels = this._fileMapData.get(fileUri);
    if (!existingLabels) {
      this._fileMapData.set(fileUri, labels);
      labels.forEach((data) => this.push(data, "labelNameOnly"));
      return;
    }
    const newLabels = [];
    const sameLabels = [];
    labels.forEach((newLabel) => {
      const existsLabel = existingLabels.find((existingLabel) => this.labelEquals(existingLabel, newLabel));
      if (existsLabel) sameLabels.push(existsLabel);
      else newLabels.push(newLabel);
    });
    const toRemoveLabels = existingLabels.filter((existingLabel) => !sameLabels.includes(existingLabel));
    toRemoveLabels.forEach((data) => this.remove(data, "labelNameOnly"));
    newLabels.forEach((data) => this.push(data, "labelNameOnly"));
    this._fileMapData.set(fileUri, [...sameLabels, ...newLabels]);
  }
  setBranchLabelsOfUri(uri, labels) {
    const fileUri = getFileId(uri);
    this._branchLabelFileMapData.set(fileUri, labels);
  }
  removeLabelsOfUri(uri) {
    const fileUri = getFileId(uri);
    this._branchLabelFileMapData.delete(fileUri);
    const existingLabels = this._fileMapData.get(fileUri);
    if (!existingLabels) return;
    this._fileMapData.delete(fileUri);
    existingLabels.forEach((data) => this.remove(data, "labelNameOnly"));
    this.updateExternalLabelsExistence();
  }
  updateExternalLabelsOfFileExistence(uri) {
    const fileUri = getFileId(uri);
    this._fileMapData.get(fileUri)?.forEach((label) => {
      label.value.exists = this._labelNameMapData.get(label.value.name)?.some((l) => !l.value.isExternal) ?? false;
    });
  }
  updateExternalLabelsExistence() {
    this._labelNameMapData.forEach((labels) => labels.filter((label) => label.value.isExternal).forEach((label) => {
      label.value.exists = labels.some((l) => !l.value.isExternal);
    }));
  }
};
var labelManager = new DataManager();

// src/resource/label/completion.ts
var cachedResults = [];
var lastDocumentUri = "";
function resetCompletionCache() {
  cachedResults = [];
  lastDocumentUri = "";
}
var INSERT_ORDER = [
  ["extrn", 1],
  ["include", 1],
  ["global", 0],
  ["psect", 0]
];
function labelToCompletionItem(label, type) {
  const {
    uri,
    position,
    value: { name: labelName, comment }
  } = label;
  const fileUri = getFileId(uri);
  const item = new import_vscode4.CompletionItem(labelName, import_vscode4.CompletionItemKind.Function);
  item.insertText = labelName;
  item.documentation = new import_vscode4.MarkdownString(label.value.comment);
  item.documentation = new import_vscode4.MarkdownString(`Define in \`${fileUri}:${position.line}\`

${comment || ""}`);
  switch (type) {
    case "currentFile":
      item.detail = "(this file)";
      item.sortText = `0_${labelName}`;
      break;
    case "imported":
      item.detail = `(imported)`;
      item.sortText = `0_${labelName}`;
      break;
    case "external":
      item.detail = `(external)`;
      item.sortText = `1_${labelName}`;
      break;
  }
  return item;
}
function getLabelCompletions(document) {
  const fileUri = getFileId(document.uri);
  if (lastDocumentUri === fileUri) return cachedResults;
  const currentFilesLabels = labelManager.fileMapData.get(fileUri) || [];
  const importedLabels = currentFilesLabels.filter(({ value: label }) => label.isExternal).map(({ value: label }) => label.name);
  const documentText = document.getText().toLowerCase();
  const completions = currentFilesLabels.filter(
    ({ value: { isExternal } }) => !isExternal
  ).map((label) => labelToCompletionItem(
    label,
    "currentFile"
  ));
  labelManager.fileMapData.forEach((resource, uri) => {
    if (uri === fileUri) return;
    completions.push(...resource.filter(({ value: { isExternal } }) => !isExternal).map((resource2) => {
      const labelName = resource2.value.name;
      if (importedLabels.includes(labelName)) return labelToCompletionItem(resource2, "imported");
      const item = labelToCompletionItem(resource2, "external");
      let insertLine = 0;
      for (const [directive, indexType] of INSERT_ORDER) {
        if (!documentText.includes(directive)) continue;
        insertLine = document.positionAt(
          indexType === 1 ? documentText.lastIndexOf(directive) : documentText.indexOf(directive)
        ).line + indexType;
        break;
      }
      item.additionalTextEdits = [import_vscode4.TextEdit.insert(new import_vscode4.Position(insertLine, 0), `EXTRN ${labelName}
`)];
      return item;
    }));
  });
  cachedResults = completions;
  lastDocumentUri = fileUri;
  return completions;
}

// src/resource/variable/completion.ts
var import_vscode5 = require("vscode");

// src/resource/include/data.ts
var DataManager2 = class {
  get fileMapData() {
    return this._fileMapData;
  }
  get recursiveIncludeMapData() {
    return this._recursiveIncludeMapData;
  }
  constructor() {
    this._fileMapData = /* @__PURE__ */ new Map();
    this._recursiveIncludeMapData = /* @__PURE__ */ new Map();
    this._referencesCallbacks = /* @__PURE__ */ new Set();
  }
  referenceRefresh(modifyInclude) {
    const uris = Array.from(modifyInclude.value.referencedBy).map((uri) => {
      const includeData = this._fileMapData.get(uri);
      return includeData && includeData.uri;
    }).filter((uri) => uri !== void 0);
    if (this._fileMapData.has(getFileId(modifyInclude.uri))) {
      uris.push(modifyInclude.uri);
    }
    uris.forEach((uri) => this._referencesCallbacks.forEach(
      (callback) => callback(uri)
    ));
  }
  addReferencesRefreshCallback(callback) {
    this._referencesCallbacks.add(callback);
  }
  push(include) {
    const fileUri = getFileId(include.uri);
    this._fileMapData.set(fileUri, include);
    include.value.includes.forEach((includedFileUri) => {
      const includedFileData = this._fileMapData.get(includedFileUri);
      if (!includedFileData) return;
      includedFileData.value.referencedBy.add(fileUri);
    });
    this._recursiveIncludeMapData.set(
      fileUri,
      this.getRecursiveIncludesOfUri(include.uri)
    );
    include.value.referencedBy.forEach((referencingFileUri) => {
      const referencingIncludeData = this._fileMapData.get(referencingFileUri);
      if (!referencingIncludeData) return;
      this._recursiveIncludeMapData.set(
        referencingFileUri,
        this.getRecursiveIncludesOfUri(referencingIncludeData.uri)
      );
    });
    this.referenceRefresh(include);
  }
  remove(include) {
    const fileUri = getFileId(include.uri);
    const includeData = this._fileMapData.get(fileUri);
    if (!includeData) return;
    this._fileMapData.delete(fileUri);
    includeData.value.includes.forEach((includedFileUri) => {
      const includedFileData = this._fileMapData.get(includedFileUri);
      if (!includedFileData) return;
      includedFileData.value.referencedBy.delete(fileUri);
    });
    this._recursiveIncludeMapData.delete(fileUri);
    includeData.value.referencedBy.forEach((referencingFileUri) => {
      const referencingIncludeData = this._fileMapData.get(referencingFileUri);
      if (!referencingIncludeData) return;
      referencingIncludeData.value.includes.delete(fileUri);
      this._recursiveIncludeMapData.set(
        referencingFileUri,
        this.getRecursiveIncludesOfUri(referencingIncludeData.uri)
      );
    });
    this.referenceRefresh(include);
  }
  clear() {
    this._fileMapData.clear();
  }
  setIncludeOfUri(uri, include) {
    const fileUri = getFileId(uri);
    const oldIncludeData = this._fileMapData.get(fileUri);
    if (oldIncludeData) {
      include.value.referencedBy = oldIncludeData.value.referencedBy;
      [...oldIncludeData.value.includes].filter((x) => !include.value.includes.has(x)).forEach((includedFileUri) => {
        const includedFileData = this._fileMapData.get(includedFileUri);
        if (!includedFileData) return;
        includedFileData.value.referencedBy.delete(fileUri);
      });
    }
    this.push(include);
  }
  removeIncludeOfUri(uri) {
    const fileUri = getFileId(uri);
    const existInclude = this._fileMapData.get(fileUri);
    if (!existInclude) return;
    this.remove(existInclude);
  }
  updateReferences() {
    this._fileMapData.forEach((includeData, fileUri) => {
      includeData.value.includes.forEach((includedFileUri) => {
        const includedFileData = this._fileMapData.get(includedFileUri);
        if (!includedFileData) return;
        includedFileData.value.referencedBy.add(fileUri);
      });
    });
    this._fileMapData.forEach((includeData, fileUri) => {
      const recursiveIncludes = this.getRecursiveIncludesOfUri(includeData.uri);
      this._recursiveIncludeMapData.set(fileUri, recursiveIncludes);
    });
  }
  getRecursiveIncludesOfUri(uri, results) {
    const fileUri = getFileId(uri);
    if (results === void 0) results = /* @__PURE__ */ new Set([fileUri]);
    const includeData = this._fileMapData.get(fileUri);
    if (!includeData) return results;
    includeData.value.includes.forEach((fileUri2) => {
      if (results.has(fileUri2)) return;
      results.add(fileUri2);
      const includeData2 = this._fileMapData.get(fileUri2);
      if (!includeData2) return;
      this.getRecursiveIncludesOfUri(includeData2.uri, results);
    });
    return results;
  }
};
var includeManager = new DataManager2();

// src/resource/variable/data.ts
var DataManager3 = class {
  get fileMapDefineData() {
    return this._fileMapDefineData;
  }
  get fileMapUsageData() {
    return this._fileMapUsageData;
  }
  constructor() {
    this._fileMapDefineData = /* @__PURE__ */ new Map();
    this._fileMapUsageData = /* @__PURE__ */ new Map();
  }
  push(variable) {
    const { uri, value: { name } } = variable;
    const fileUri = getFileId(uri);
    const nameMap = this._fileMapDefineData.get(fileUri) ?? this._fileMapDefineData.set(fileUri, /* @__PURE__ */ new Map()).get(fileUri);
    nameMap.set(name, variable);
  }
  clear() {
    this._fileMapDefineData.clear();
  }
  setDefineVariablesOfUri(uri, variables) {
    if (variables.length === 0) {
      this.removeDefineVariablesOfUri(uri);
      return;
    }
    variables.forEach((variable) => this.push(variable));
  }
  removeDefineVariablesOfUri(uri) {
    const fileUri = getFileId(uri);
    this._fileMapDefineData.delete(fileUri);
  }
  setUsageVariablesOfUri(uri, variables) {
    const fileUri = getFileId(uri);
    this._fileMapUsageData.set(fileUri, variables);
    this.refreshUsageVariablesExistsOfUri(uri);
  }
  removeUsageVariablesOfUri(uri) {
    const fileUri = getFileId(uri);
    this._fileMapUsageData.delete(fileUri);
  }
  refreshUsageVariablesExistsOfUri(uri) {
    const fileUri = getFileId(uri);
    const variables = this._fileMapUsageData.get(fileUri);
    if (!variables) return;
    const includedVariables = [];
    includeManager.recursiveIncludeMapData.get(fileUri)?.forEach((includeUri) => {
      const variables2 = this._fileMapDefineData.get(includeUri);
      if (variables2) includedVariables.push(...Array.from(variables2.values()));
    });
    variables.forEach((variable) => {
      variable.value.exists = includedVariables.some((v) => v.value.name === variable.value.name);
    });
  }
  refreshAllUsageVariablesExists() {
    this._fileMapUsageData.forEach((data) => {
      if (data.length === 0) return;
      this.refreshUsageVariablesExistsOfUri(data[0].uri);
    });
  }
};
var variableManager = new DataManager3();

// src/resource/variable/completion.ts
function getVariableCompletions(document) {
  const fileUri = getFileId(document.uri);
  const includeFiles = includeManager.recursiveIncludeMapData.get(fileUri);
  if (!includeFiles) return [];
  const includedVariables = [];
  includeFiles.forEach((includeUri) => {
    variableManager.fileMapDefineData.get(includeUri)?.forEach(({ position, value: { value, comment } }, name) => {
      const item = new import_vscode5.CompletionItem(name, import_vscode5.CompletionItemKind.Variable);
      item.insertText = name;
      item.detail = `(variable) ${value}`;
      item.documentation = new import_vscode5.MarkdownString(`Define in \`${includeUri}:${position.line}\`

${comment || ""}`);
      includedVariables.push(item);
    });
  });
  return includedVariables;
}

// src/subscriptions/autoComplete.ts
async function provideCompletionItems(document, position, token, context) {
  const filePath = getFileId(document.uri);
  const linePrefix = document.lineAt(position).text.slice(0, position.character);
  if (/;/.test(linePrefix)) {
    return void 0;
  }
  if (isBranchAutoComplete(linePrefix)) {
    return getLabelCompletions(document);
  }
  if (/^(?:\s)*([^\s\#]+)?$/.test(linePrefix)) {
    return PIC_INSTRUCTIONS_COMPLETIONS;
  }
  return [
    ...getVariableCompletions(document),
    ...PIC_DEFINE_COMPLETIONS_WITH_SORT_TEXT
  ];
}
function initAutoCompletionProvider(context) {
  const {
    subscriptions
  } = context;
  const provider2 = import_vscode6.languages.registerCompletionItemProvider(
    { language: "asm" },
    { provideCompletionItems },
    " ",
    ","
  );
  subscriptions.push(provider2);
}

// src/subscriptions/fileWatcher.ts
var import_vscode15 = require("vscode");

// src/config.ts
var import_vscode7 = require("vscode");
var DEFAULT_EXCLUDE_FILES = [
  "**/node_modules/**",
  "**/build/**",
  "**/.vscode/**",
  "**/.git/**",
  "**/nbproject/**",
  "**/dist/**",
  "**/debug/**",
  "**/_build/**",
  "**/cmake/**",
  "**/out/**"
];
var EXCLUDE_FILES = DEFAULT_EXCLUDE_FILES;
var FILE_GLOBS = `**/*.{asm,as,s,inc}`;
async function getWorkspaceFileUris() {
  return await import_vscode7.workspace.findFiles(
    FILE_GLOBS,
    `{${EXCLUDE_FILES.join(",")}}`
  );
}

// src/utils/scheduleWork.ts
var debounceTimerMap = /* @__PURE__ */ new Map();
function scheduleWork(key, work, delay = 200) {
  if (debounceTimerMap.has(key)) clearTimeout(debounceTimerMap.get(key));
  const timer = setTimeout(() => {
    work();
    debounceTimerMap.delete(key);
  }, delay);
  debounceTimerMap.set(key, timer);
}

// src/resource/label/analyze.ts
var import_vscode11 = require("vscode");

// src/resource/types.ts
var import_vscode8 = require("vscode");
var ResourceData = class {
  constructor(props) {
    const { value, uri, position, range } = props;
    this.value = value;
    this.uri = uri;
    this.position = position;
    this.range = range ?? new import_vscode8.Range(position, position);
  }
};

// src/resource/label/diagnostic.ts
var import_vscode9 = require("vscode");
var labelCollections = import_vscode9.languages.createDiagnosticCollection("pic18-asm-labels");
function updateLabelDiagnostics() {
  labelCollections.clear();
  const diagnosticsMap = /* @__PURE__ */ new Map();
  const pushDiagnostic = (uri, diagnostic) => {
    const fileUri = getFileId(uri);
    if (diagnosticsMap.has(fileUri)) diagnosticsMap.get(fileUri).diagnostics.push(diagnostic);
    else diagnosticsMap.set(fileUri, {
      uri,
      diagnostics: [diagnostic]
    });
  };
  labelManager.labelNameMapData.forEach((labels, labelName) => {
    const definedLabel = [];
    labels.forEach((label) => {
      if (!label.value.isExternal) {
        definedLabel.push(label);
        return;
      }
      if (label.value.exists) return;
      pushDiagnostic(
        label.uri,
        new import_vscode9.Diagnostic(
          label.range,
          `Undefined external label '${labelName}'`,
          import_vscode9.DiagnosticSeverity.Error
        )
      );
    });
    if (definedLabel.length > 1) {
      definedLabel.forEach(({ uri, range }) => pushDiagnostic(
        uri,
        new import_vscode9.Diagnostic(
          range,
          `Duplicate label '${labelName}'`,
          import_vscode9.DiagnosticSeverity.Error
        )
      ));
    }
  });
  labelManager.branchLabelFileMapData.forEach((labels) => labels.forEach(({
    uri,
    range,
    value: { name, missing }
  }) => {
    if (!missing) return;
    pushDiagnostic(uri, new import_vscode9.Diagnostic(
      range,
      `Unknow branch label '${name}'`,
      import_vscode9.DiagnosticSeverity.Error
    ));
  }));
  diagnosticsMap.forEach(({ uri, diagnostics }) => labelCollections.set(uri, diagnostics));
}

// src/resource/label/types/base.ts
var BaseLabelData = class {
  constructor(props) {
    const { name, comment } = props;
    this.name = name;
    this.comment = comment;
  }
};

// src/resource/label/types/label.ts
var LabelData = class extends BaseLabelData {
  constructor(props) {
    super(props);
    const { isExternal, exists } = props;
    this.isExternal = isExternal;
    this.exists = exists === void 0 ? !isExternal : exists;
  }
};

// src/resource/label/types/branchLabel.ts
var BranchLabelData = class extends BaseLabelData {
  constructor(props) {
    super(props);
    const { missing } = props;
    this.missing = missing;
  }
};

// src/semantic/index.ts
var import_vscode10 = require("vscode");

// src/semantic/module/label.ts
function getLabelRanges(document) {
  const fileUri = getFileId(document.uri);
  const branchLabelRanges = labelManager.branchLabelFileMapData.get(fileUri)?.filter(
    (l) => !l.value.missing
  ).map((l) => l.range) ?? [];
  const externalLabelRanges = labelManager.fileMapData.get(fileUri)?.filter(
    (l) => l.value.isExternal && l.value.exists
  ).map((l) => l.range) ?? [];
  return [...branchLabelRanges, ...externalLabelRanges];
}

// src/semantic/module/variable.ts
function getVariableRanges(document) {
  const fileUri = getFileId(document.uri);
  const usageDataRanges = Array.from(variableManager.fileMapUsageData.get(fileUri)?.values() ?? []).filter(
    (l) => l.value.exists
  ).map((l) => l.range);
  return usageDataRanges;
}

// node_modules/lru-cache/dist/esm/index.js
var defaultPerf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
var warned = /* @__PURE__ */ new Set();
var PROCESS = typeof process === "object" && !!process ? process : {};
var emitWarning = (msg, type, code, fn) => {
  typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type, code, fn) : console.error(`[${code}] ${type}: ${msg}`);
};
var AC = globalThis.AbortController;
var AS = globalThis.AbortSignal;
if (typeof AC === "undefined") {
  AS = class AbortSignal {
    onabort;
    _onabort = [];
    reason;
    aborted = false;
    addEventListener(_, fn) {
      this._onabort.push(fn);
    }
  };
  AC = class AbortController {
    constructor() {
      warnACPolyfill();
    }
    signal = new AS();
    abort(reason) {
      if (this.signal.aborted)
        return;
      this.signal.reason = reason;
      this.signal.aborted = true;
      for (const fn of this.signal._onabort) {
        fn(reason);
      }
      this.signal.onabort?.(reason);
    }
  };
  let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
  const warnACPolyfill = () => {
    if (!printACPolyfillWarning)
      return;
    printACPolyfillWarning = false;
    emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
  };
}
var shouldWarn = (code) => !warned.has(code);
var TYPE = Symbol("type");
var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
var ZeroArray = class extends Array {
  constructor(size) {
    super(size);
    this.fill(0);
  }
};
var Stack = class _Stack {
  heap;
  length;
  // private constructor
  static #constructing = false;
  static create(max) {
    const HeapCls = getUintArray(max);
    if (!HeapCls)
      return [];
    _Stack.#constructing = true;
    const s = new _Stack(max, HeapCls);
    _Stack.#constructing = false;
    return s;
  }
  constructor(max, HeapCls) {
    if (!_Stack.#constructing) {
      throw new TypeError("instantiate Stack using Stack.create(n)");
    }
    this.heap = new HeapCls(max);
    this.length = 0;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
};
var LRUCache = class _LRUCache {
  // options that cannot be changed without disaster
  #max;
  #maxSize;
  #dispose;
  #onInsert;
  #disposeAfter;
  #fetchMethod;
  #memoMethod;
  #perf;
  /**
   * {@link LRUCache.OptionsBase.perf}
   */
  get perf() {
    return this.#perf;
  }
  /**
   * {@link LRUCache.OptionsBase.ttl}
   */
  ttl;
  /**
   * {@link LRUCache.OptionsBase.ttlResolution}
   */
  ttlResolution;
  /**
   * {@link LRUCache.OptionsBase.ttlAutopurge}
   */
  ttlAutopurge;
  /**
   * {@link LRUCache.OptionsBase.updateAgeOnGet}
   */
  updateAgeOnGet;
  /**
   * {@link LRUCache.OptionsBase.updateAgeOnHas}
   */
  updateAgeOnHas;
  /**
   * {@link LRUCache.OptionsBase.allowStale}
   */
  allowStale;
  /**
   * {@link LRUCache.OptionsBase.noDisposeOnSet}
   */
  noDisposeOnSet;
  /**
   * {@link LRUCache.OptionsBase.noUpdateTTL}
   */
  noUpdateTTL;
  /**
   * {@link LRUCache.OptionsBase.maxEntrySize}
   */
  maxEntrySize;
  /**
   * {@link LRUCache.OptionsBase.sizeCalculation}
   */
  sizeCalculation;
  /**
   * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
   */
  noDeleteOnFetchRejection;
  /**
   * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
   */
  noDeleteOnStaleGet;
  /**
   * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
   */
  allowStaleOnFetchAbort;
  /**
   * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
   */
  allowStaleOnFetchRejection;
  /**
   * {@link LRUCache.OptionsBase.ignoreFetchAbort}
   */
  ignoreFetchAbort;
  // computed properties
  #size;
  #calculatedSize;
  #keyMap;
  #keyList;
  #valList;
  #next;
  #prev;
  #head;
  #tail;
  #free;
  #disposed;
  #sizes;
  #starts;
  #ttls;
  #hasDispose;
  #hasFetchMethod;
  #hasDisposeAfter;
  #hasOnInsert;
  /**
   * Do not call this method unless you need to inspect the
   * inner workings of the cache.  If anything returned by this
   * object is modified in any way, strange breakage may occur.
   *
   * These fields are private for a reason!
   *
   * @internal
   */
  static unsafeExposeInternals(c) {
    return {
      // properties
      starts: c.#starts,
      ttls: c.#ttls,
      sizes: c.#sizes,
      keyMap: c.#keyMap,
      keyList: c.#keyList,
      valList: c.#valList,
      next: c.#next,
      prev: c.#prev,
      get head() {
        return c.#head;
      },
      get tail() {
        return c.#tail;
      },
      free: c.#free,
      // methods
      isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
      backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
      moveToTail: (index) => c.#moveToTail(index),
      indexes: (options) => c.#indexes(options),
      rindexes: (options) => c.#rindexes(options),
      isStale: (index) => c.#isStale(index)
    };
  }
  // Protected read-only members
  /**
   * {@link LRUCache.OptionsBase.max} (read-only)
   */
  get max() {
    return this.#max;
  }
  /**
   * {@link LRUCache.OptionsBase.maxSize} (read-only)
   */
  get maxSize() {
    return this.#maxSize;
  }
  /**
   * The total computed size of items in the cache (read-only)
   */
  get calculatedSize() {
    return this.#calculatedSize;
  }
  /**
   * The number of items stored in the cache (read-only)
   */
  get size() {
    return this.#size;
  }
  /**
   * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
   */
  get fetchMethod() {
    return this.#fetchMethod;
  }
  get memoMethod() {
    return this.#memoMethod;
  }
  /**
   * {@link LRUCache.OptionsBase.dispose} (read-only)
   */
  get dispose() {
    return this.#dispose;
  }
  /**
   * {@link LRUCache.OptionsBase.onInsert} (read-only)
   */
  get onInsert() {
    return this.#onInsert;
  }
  /**
   * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
   */
  get disposeAfter() {
    return this.#disposeAfter;
  }
  constructor(options) {
    const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, perf } = options;
    if (perf !== void 0) {
      if (typeof perf?.now !== "function") {
        throw new TypeError("perf option must have a now() method if specified");
      }
    }
    this.#perf = perf ?? defaultPerf;
    if (max !== 0 && !isPosInt(max)) {
      throw new TypeError("max option must be a nonnegative integer");
    }
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) {
      throw new Error("invalid max value: " + max);
    }
    this.#max = max;
    this.#maxSize = maxSize;
    this.maxEntrySize = maxEntrySize || this.#maxSize;
    this.sizeCalculation = sizeCalculation;
    if (this.sizeCalculation) {
      if (!this.#maxSize && !this.maxEntrySize) {
        throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
      }
      if (typeof this.sizeCalculation !== "function") {
        throw new TypeError("sizeCalculation set to non-function");
      }
    }
    if (memoMethod !== void 0 && typeof memoMethod !== "function") {
      throw new TypeError("memoMethod must be a function if defined");
    }
    this.#memoMethod = memoMethod;
    if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
      throw new TypeError("fetchMethod must be a function if specified");
    }
    this.#fetchMethod = fetchMethod;
    this.#hasFetchMethod = !!fetchMethod;
    this.#keyMap = /* @__PURE__ */ new Map();
    this.#keyList = new Array(max).fill(void 0);
    this.#valList = new Array(max).fill(void 0);
    this.#next = new UintArray(max);
    this.#prev = new UintArray(max);
    this.#head = 0;
    this.#tail = 0;
    this.#free = Stack.create(max);
    this.#size = 0;
    this.#calculatedSize = 0;
    if (typeof dispose === "function") {
      this.#dispose = dispose;
    }
    if (typeof onInsert === "function") {
      this.#onInsert = onInsert;
    }
    if (typeof disposeAfter === "function") {
      this.#disposeAfter = disposeAfter;
      this.#disposed = [];
    } else {
      this.#disposeAfter = void 0;
      this.#disposed = void 0;
    }
    this.#hasDispose = !!this.#dispose;
    this.#hasOnInsert = !!this.#onInsert;
    this.#hasDisposeAfter = !!this.#disposeAfter;
    this.noDisposeOnSet = !!noDisposeOnSet;
    this.noUpdateTTL = !!noUpdateTTL;
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
    this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
    this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
    this.ignoreFetchAbort = !!ignoreFetchAbort;
    if (this.maxEntrySize !== 0) {
      if (this.#maxSize !== 0) {
        if (!isPosInt(this.#maxSize)) {
          throw new TypeError("maxSize must be a positive integer if specified");
        }
      }
      if (!isPosInt(this.maxEntrySize)) {
        throw new TypeError("maxEntrySize must be a positive integer if specified");
      }
      this.#initializeSizeTracking();
    }
    this.allowStale = !!allowStale;
    this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
    this.updateAgeOnGet = !!updateAgeOnGet;
    this.updateAgeOnHas = !!updateAgeOnHas;
    this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
    this.ttlAutopurge = !!ttlAutopurge;
    this.ttl = ttl || 0;
    if (this.ttl) {
      if (!isPosInt(this.ttl)) {
        throw new TypeError("ttl must be a positive integer if specified");
      }
      this.#initializeTTLTracking();
    }
    if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
      throw new TypeError("At least one of max, maxSize, or ttl is required");
    }
    if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
        emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
      }
    }
  }
  /**
   * Return the number of ms left in the item's TTL. If item is not in cache,
   * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
   */
  getRemainingTTL(key) {
    return this.#keyMap.has(key) ? Infinity : 0;
  }
  #initializeTTLTracking() {
    const ttls = new ZeroArray(this.#max);
    const starts = new ZeroArray(this.#max);
    this.#ttls = ttls;
    this.#starts = starts;
    this.#setItemTTL = (index, ttl, start = this.#perf.now()) => {
      starts[index] = ttl !== 0 ? start : 0;
      ttls[index] = ttl;
      if (ttl !== 0 && this.ttlAutopurge) {
        const t = setTimeout(() => {
          if (this.#isStale(index)) {
            this.#delete(this.#keyList[index], "expire");
          }
        }, ttl + 1);
        if (t.unref) {
          t.unref();
        }
      }
    };
    this.#updateItemAge = (index) => {
      starts[index] = ttls[index] !== 0 ? this.#perf.now() : 0;
    };
    this.#statusTTL = (status, index) => {
      if (ttls[index]) {
        const ttl = ttls[index];
        const start = starts[index];
        if (!ttl || !start)
          return;
        status.ttl = ttl;
        status.start = start;
        status.now = cachedNow || getNow();
        const age = status.now - start;
        status.remainingTTL = ttl - age;
      }
    };
    let cachedNow = 0;
    const getNow = () => {
      const n = this.#perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
        if (t.unref) {
          t.unref();
        }
      }
      return n;
    };
    this.getRemainingTTL = (key) => {
      const index = this.#keyMap.get(key);
      if (index === void 0) {
        return 0;
      }
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start) {
        return Infinity;
      }
      const age = (cachedNow || getNow()) - start;
      return ttl - age;
    };
    this.#isStale = (index) => {
      const s = starts[index];
      const t = ttls[index];
      return !!t && !!s && (cachedNow || getNow()) - s > t;
    };
  }
  // conditionally set private methods related to TTL
  #updateItemAge = () => {
  };
  #statusTTL = () => {
  };
  #setItemTTL = () => {
  };
  /* c8 ignore stop */
  #isStale = () => false;
  #initializeSizeTracking() {
    const sizes = new ZeroArray(this.#max);
    this.#calculatedSize = 0;
    this.#sizes = sizes;
    this.#removeItemSize = (index) => {
      this.#calculatedSize -= sizes[index];
      sizes[index] = 0;
    };
    this.#requireSize = (k, v, size, sizeCalculation) => {
      if (this.#isBackgroundFetch(v)) {
        return 0;
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation must be a function");
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          }
        } else {
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
        }
      }
      return size;
    };
    this.#addItemSize = (index, size, status) => {
      sizes[index] = size;
      if (this.#maxSize) {
        const maxSize = this.#maxSize - sizes[index];
        while (this.#calculatedSize > maxSize) {
          this.#evict(true);
        }
      }
      this.#calculatedSize += sizes[index];
      if (status) {
        status.entrySize = size;
        status.totalCalculatedSize = this.#calculatedSize;
      }
    };
  }
  #removeItemSize = (_i) => {
  };
  #addItemSize = (_i, _s, _st) => {
  };
  #requireSize = (_k, _v, size, sizeCalculation) => {
    if (size || sizeCalculation) {
      throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
    }
    return 0;
  };
  *#indexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#tail; true; ) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#head) {
          break;
        } else {
          i = this.#prev[i];
        }
      }
    }
  }
  *#rindexes({ allowStale = this.allowStale } = {}) {
    if (this.#size) {
      for (let i = this.#head; true; ) {
        if (!this.#isValidIndex(i)) {
          break;
        }
        if (allowStale || !this.#isStale(i)) {
          yield i;
        }
        if (i === this.#tail) {
          break;
        } else {
          i = this.#next[i];
        }
      }
    }
  }
  #isValidIndex(index) {
    return index !== void 0 && this.#keyMap.get(this.#keyList[index]) === index;
  }
  /**
   * Return a generator yielding `[key, value]` pairs,
   * in order from most recently used to least recently used.
   */
  *entries() {
    for (const i of this.#indexes()) {
      if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield [this.#keyList[i], this.#valList[i]];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.entries}
   *
   * Return a generator yielding `[key, value]` pairs,
   * in order from least recently used to most recently used.
   */
  *rentries() {
    for (const i of this.#rindexes()) {
      if (this.#valList[i] !== void 0 && this.#keyList[i] !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield [this.#keyList[i], this.#valList[i]];
      }
    }
  }
  /**
   * Return a generator yielding the keys in the cache,
   * in order from most recently used to least recently used.
   */
  *keys() {
    for (const i of this.#indexes()) {
      const k = this.#keyList[i];
      if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield k;
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.keys}
   *
   * Return a generator yielding the keys in the cache,
   * in order from least recently used to most recently used.
   */
  *rkeys() {
    for (const i of this.#rindexes()) {
      const k = this.#keyList[i];
      if (k !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield k;
      }
    }
  }
  /**
   * Return a generator yielding the values in the cache,
   * in order from most recently used to least recently used.
   */
  *values() {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield this.#valList[i];
      }
    }
  }
  /**
   * Inverse order version of {@link LRUCache.values}
   *
   * Return a generator yielding the values in the cache,
   * in order from least recently used to most recently used.
   */
  *rvalues() {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      if (v !== void 0 && !this.#isBackgroundFetch(this.#valList[i])) {
        yield this.#valList[i];
      }
    }
  }
  /**
   * Iterating over the cache itself yields the same results as
   * {@link LRUCache.entries}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * A String value that is used in the creation of the default string
   * description of an object. Called by the built-in method
   * `Object.prototype.toString`.
   */
  [Symbol.toStringTag] = "LRUCache";
  /**
   * Find a value for which the supplied fn method returns a truthy value,
   * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
   */
  find(fn, getOptions = {}) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      if (fn(value, this.#keyList[i], this)) {
        return this.get(this.#keyList[i], getOptions);
      }
    }
  }
  /**
   * Call the supplied function on each item in the cache, in order from most
   * recently used to least recently used.
   *
   * `fn` is called as `fn(value, key, cache)`.
   *
   * If `thisp` is provided, function will be called in the `this`-context of
   * the provided object, or the cache if no `thisp` object is provided.
   *
   * Does not update age or recenty of use, or iterate over stale values.
   */
  forEach(fn, thisp = this) {
    for (const i of this.#indexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.#keyList[i], this);
    }
  }
  /**
   * The same as {@link LRUCache.forEach} but items are iterated over in
   * reverse order.  (ie, less recently used items are iterated over first.)
   */
  rforEach(fn, thisp = this) {
    for (const i of this.#rindexes()) {
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        continue;
      fn.call(thisp, value, this.#keyList[i], this);
    }
  }
  /**
   * Delete any stale entries. Returns true if anything was removed,
   * false otherwise.
   */
  purgeStale() {
    let deleted = false;
    for (const i of this.#rindexes({ allowStale: true })) {
      if (this.#isStale(i)) {
        this.#delete(this.#keyList[i], "expire");
        deleted = true;
      }
    }
    return deleted;
  }
  /**
   * Get the extended info about a given entry, to get its value, size, and
   * TTL info simultaneously. Returns `undefined` if the key is not present.
   *
   * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
   * serialization, the `start` value is always the current timestamp, and the
   * `ttl` is a calculated remaining time to live (negative if expired).
   *
   * Always returns stale values, if their info is found in the cache, so be
   * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
   * if relevant.
   */
  info(key) {
    const i = this.#keyMap.get(key);
    if (i === void 0)
      return void 0;
    const v = this.#valList[i];
    const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    if (value === void 0)
      return void 0;
    const entry = { value };
    if (this.#ttls && this.#starts) {
      const ttl = this.#ttls[i];
      const start = this.#starts[i];
      if (ttl && start) {
        const remain = ttl - (this.#perf.now() - start);
        entry.ttl = remain;
        entry.start = Date.now();
      }
    }
    if (this.#sizes) {
      entry.size = this.#sizes[i];
    }
    return entry;
  }
  /**
   * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
   * passed to {@link LRUCache#load}.
   *
   * The `start` fields are calculated relative to a portable `Date.now()`
   * timestamp, even if `performance.now()` is available.
   *
   * Stale entries are always included in the `dump`, even if
   * {@link LRUCache.OptionsBase.allowStale} is false.
   *
   * Note: this returns an actual array, not a generator, so it can be more
   * easily passed around.
   */
  dump() {
    const arr = [];
    for (const i of this.#indexes({ allowStale: true })) {
      const key = this.#keyList[i];
      const v = this.#valList[i];
      const value = this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
      if (value === void 0 || key === void 0)
        continue;
      const entry = { value };
      if (this.#ttls && this.#starts) {
        entry.ttl = this.#ttls[i];
        const age = this.#perf.now() - this.#starts[i];
        entry.start = Math.floor(Date.now() - age);
      }
      if (this.#sizes) {
        entry.size = this.#sizes[i];
      }
      arr.unshift([key, entry]);
    }
    return arr;
  }
  /**
   * Reset the cache and load in the items in entries in the order listed.
   *
   * The shape of the resulting cache may be different if the same options are
   * not used in both caches.
   *
   * The `start` fields are assumed to be calculated relative to a portable
   * `Date.now()` timestamp, even if `performance.now()` is available.
   */
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = this.#perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  /**
   * Add a value to the cache.
   *
   * Note: if `undefined` is specified as a value, this is an alias for
   * {@link LRUCache#delete}
   *
   * Fields on the {@link LRUCache.SetOptions} options param will override
   * their corresponding values in the constructor options for the scope
   * of this single `set()` operation.
   *
   * If `start` is provided, then that will set the effective start
   * time for the TTL calculation. Note that this must be a previous
   * value of `performance.now()` if supported, or a previous value of
   * `Date.now()` if not.
   *
   * Options object may also include `size`, which will prevent
   * calling the `sizeCalculation` function and just use the specified
   * number if it is a positive integer, and `noDisposeOnSet` which
   * will prevent calling a `dispose` function in the case of
   * overwrites.
   *
   * If the `size` (or return value of `sizeCalculation`) for a given
   * entry is greater than `maxEntrySize`, then the item will not be
   * added to the cache.
   *
   * Will update the recency of the entry.
   *
   * If the value is `undefined`, then this is an alias for
   * `cache.delete(key)`. `undefined` is never stored in the cache.
   */
  set(k, v, setOptions = {}) {
    if (v === void 0) {
      this.delete(k);
      return this;
    }
    const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
    let { noUpdateTTL = this.noUpdateTTL } = setOptions;
    const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
    if (this.maxEntrySize && size > this.maxEntrySize) {
      if (status) {
        status.set = "miss";
        status.maxEntrySizeExceeded = true;
      }
      this.#delete(k, "set");
      return this;
    }
    let index = this.#size === 0 ? void 0 : this.#keyMap.get(k);
    if (index === void 0) {
      index = this.#size === 0 ? this.#tail : this.#free.length !== 0 ? this.#free.pop() : this.#size === this.#max ? this.#evict(false) : this.#size;
      this.#keyList[index] = k;
      this.#valList[index] = v;
      this.#keyMap.set(k, index);
      this.#next[this.#tail] = index;
      this.#prev[index] = this.#tail;
      this.#tail = index;
      this.#size++;
      this.#addItemSize(index, size, status);
      if (status)
        status.set = "add";
      noUpdateTTL = false;
      if (this.#hasOnInsert) {
        this.#onInsert?.(v, k, "add");
      }
    } else {
      this.#moveToTail(index);
      const oldVal = this.#valList[index];
      if (v !== oldVal) {
        if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
          oldVal.__abortController.abort(new Error("replaced"));
          const { __staleWhileFetching: s } = oldVal;
          if (s !== void 0 && !noDisposeOnSet) {
            if (this.#hasDispose) {
              this.#dispose?.(s, k, "set");
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([s, k, "set"]);
            }
          }
        } else if (!noDisposeOnSet) {
          if (this.#hasDispose) {
            this.#dispose?.(oldVal, k, "set");
          }
          if (this.#hasDisposeAfter) {
            this.#disposed?.push([oldVal, k, "set"]);
          }
        }
        this.#removeItemSize(index);
        this.#addItemSize(index, size, status);
        this.#valList[index] = v;
        if (status) {
          status.set = "replace";
          const oldValue = oldVal && this.#isBackgroundFetch(oldVal) ? oldVal.__staleWhileFetching : oldVal;
          if (oldValue !== void 0)
            status.oldValue = oldValue;
        }
      } else if (status) {
        status.set = "update";
      }
      if (this.#hasOnInsert) {
        this.onInsert?.(v, k, v === oldVal ? "update" : "replace");
      }
    }
    if (ttl !== 0 && !this.#ttls) {
      this.#initializeTTLTracking();
    }
    if (this.#ttls) {
      if (!noUpdateTTL) {
        this.#setItemTTL(index, ttl, start);
      }
      if (status)
        this.#statusTTL(status, index);
    }
    if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
    return this;
  }
  /**
   * Evict the least recently used item, returning its value or
   * `undefined` if cache is empty.
   */
  pop() {
    try {
      while (this.#size) {
        const val = this.#valList[this.#head];
        this.#evict(true);
        if (this.#isBackgroundFetch(val)) {
          if (val.__staleWhileFetching) {
            return val.__staleWhileFetching;
          }
        } else if (val !== void 0) {
          return val;
        }
      }
    } finally {
      if (this.#hasDisposeAfter && this.#disposed) {
        const dt = this.#disposed;
        let task;
        while (task = dt?.shift()) {
          this.#disposeAfter?.(...task);
        }
      }
    }
  }
  #evict(free) {
    const head = this.#head;
    const k = this.#keyList[head];
    const v = this.#valList[head];
    if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
      v.__abortController.abort(new Error("evicted"));
    } else if (this.#hasDispose || this.#hasDisposeAfter) {
      if (this.#hasDispose) {
        this.#dispose?.(v, k, "evict");
      }
      if (this.#hasDisposeAfter) {
        this.#disposed?.push([v, k, "evict"]);
      }
    }
    this.#removeItemSize(head);
    if (free) {
      this.#keyList[head] = void 0;
      this.#valList[head] = void 0;
      this.#free.push(head);
    }
    if (this.#size === 1) {
      this.#head = this.#tail = 0;
      this.#free.length = 0;
    } else {
      this.#head = this.#next[head];
    }
    this.#keyMap.delete(k);
    this.#size--;
    return head;
  }
  /**
   * Check if a key is in the cache, without updating the recency of use.
   * Will return false if the item is stale, even though it is technically
   * in the cache.
   *
   * Check if a key is in the cache, without updating the recency of
   * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
   * to `true` in either the options or the constructor.
   *
   * Will return `false` if the item is stale, even though it is technically in
   * the cache. The difference can be determined (if it matters) by using a
   * `status` argument, and inspecting the `has` field.
   *
   * Will not update item age unless
   * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
   */
  has(k, hasOptions = {}) {
    const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
    const index = this.#keyMap.get(k);
    if (index !== void 0) {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v) && v.__staleWhileFetching === void 0) {
        return false;
      }
      if (!this.#isStale(index)) {
        if (updateAgeOnHas) {
          this.#updateItemAge(index);
        }
        if (status) {
          status.has = "hit";
          this.#statusTTL(status, index);
        }
        return true;
      } else if (status) {
        status.has = "stale";
        this.#statusTTL(status, index);
      }
    } else if (status) {
      status.has = "miss";
    }
    return false;
  }
  /**
   * Like {@link LRUCache#get} but doesn't update recency or delete stale
   * items.
   *
   * Returns `undefined` if the item is stale, unless
   * {@link LRUCache.OptionsBase.allowStale} is set.
   */
  peek(k, peekOptions = {}) {
    const { allowStale = this.allowStale } = peekOptions;
    const index = this.#keyMap.get(k);
    if (index === void 0 || !allowStale && this.#isStale(index)) {
      return;
    }
    const v = this.#valList[index];
    return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
  }
  #backgroundFetch(k, index, options, context) {
    const v = index === void 0 ? void 0 : this.#valList[index];
    if (this.#isBackgroundFetch(v)) {
      return v;
    }
    const ac = new AC();
    const { signal } = options;
    signal?.addEventListener("abort", () => ac.abort(signal.reason), {
      signal: ac.signal
    });
    const fetchOpts = {
      signal: ac.signal,
      options,
      context
    };
    const cb = (v2, updateCache = false) => {
      const { aborted } = ac.signal;
      const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
      if (options.status) {
        if (aborted && !updateCache) {
          options.status.fetchAborted = true;
          options.status.fetchError = ac.signal.reason;
          if (ignoreAbort)
            options.status.fetchAbortIgnored = true;
        } else {
          options.status.fetchResolved = true;
        }
      }
      if (aborted && !ignoreAbort && !updateCache) {
        return fetchFail(ac.signal.reason);
      }
      const bf2 = p;
      const vl = this.#valList[index];
      if (vl === p || ignoreAbort && updateCache && vl === void 0) {
        if (v2 === void 0) {
          if (bf2.__staleWhileFetching !== void 0) {
            this.#valList[index] = bf2.__staleWhileFetching;
          } else {
            this.#delete(k, "fetch");
          }
        } else {
          if (options.status)
            options.status.fetchUpdated = true;
          this.set(k, v2, fetchOpts.options);
        }
      }
      return v2;
    };
    const eb = (er) => {
      if (options.status) {
        options.status.fetchRejected = true;
        options.status.fetchError = er;
      }
      return fetchFail(er);
    };
    const fetchFail = (er) => {
      const { aborted } = ac.signal;
      const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
      const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
      const noDelete = allowStale || options.noDeleteOnFetchRejection;
      const bf2 = p;
      if (this.#valList[index] === p) {
        const del = !noDelete || bf2.__staleWhileFetching === void 0;
        if (del) {
          this.#delete(k, "fetch");
        } else if (!allowStaleAborted) {
          this.#valList[index] = bf2.__staleWhileFetching;
        }
      }
      if (allowStale) {
        if (options.status && bf2.__staleWhileFetching !== void 0) {
          options.status.returnedStale = true;
        }
        return bf2.__staleWhileFetching;
      } else if (bf2.__returned === bf2) {
        throw er;
      }
    };
    const pcall = (res, rej) => {
      const fmp = this.#fetchMethod?.(k, v, fetchOpts);
      if (fmp && fmp instanceof Promise) {
        fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
      }
      ac.signal.addEventListener("abort", () => {
        if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
          res(void 0);
          if (options.allowStaleOnFetchAbort) {
            res = (v2) => cb(v2, true);
          }
        }
      });
    };
    if (options.status)
      options.status.fetchDispatched = true;
    const p = new Promise(pcall).then(cb, eb);
    const bf = Object.assign(p, {
      __abortController: ac,
      __staleWhileFetching: v,
      __returned: void 0
    });
    if (index === void 0) {
      this.set(k, bf, { ...fetchOpts.options, status: void 0 });
      index = this.#keyMap.get(k);
    } else {
      this.#valList[index] = bf;
    }
    return bf;
  }
  #isBackgroundFetch(p) {
    if (!this.#hasFetchMethod)
      return false;
    const b = p;
    return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
  }
  async fetch(k, fetchOptions = {}) {
    const {
      // get options
      allowStale = this.allowStale,
      updateAgeOnGet = this.updateAgeOnGet,
      noDeleteOnStaleGet = this.noDeleteOnStaleGet,
      // set options
      ttl = this.ttl,
      noDisposeOnSet = this.noDisposeOnSet,
      size = 0,
      sizeCalculation = this.sizeCalculation,
      noUpdateTTL = this.noUpdateTTL,
      // fetch exclusive options
      noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
      allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
      ignoreFetchAbort = this.ignoreFetchAbort,
      allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
      context,
      forceRefresh = false,
      status,
      signal
    } = fetchOptions;
    if (!this.#hasFetchMethod) {
      if (status)
        status.fetch = "get";
      return this.get(k, {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        status
      });
    }
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection,
      allowStaleOnFetchRejection,
      allowStaleOnFetchAbort,
      ignoreFetchAbort,
      status,
      signal
    };
    let index = this.#keyMap.get(k);
    if (index === void 0) {
      if (status)
        status.fetch = "miss";
      const p = this.#backgroundFetch(k, index, options, context);
      return p.__returned = p;
    } else {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v)) {
        const stale = allowStale && v.__staleWhileFetching !== void 0;
        if (status) {
          status.fetch = "inflight";
          if (stale)
            status.returnedStale = true;
        }
        return stale ? v.__staleWhileFetching : v.__returned = v;
      }
      const isStale = this.#isStale(index);
      if (!forceRefresh && !isStale) {
        if (status)
          status.fetch = "hit";
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        if (status)
          this.#statusTTL(status, index);
        return v;
      }
      const p = this.#backgroundFetch(k, index, options, context);
      const hasStale = p.__staleWhileFetching !== void 0;
      const staleVal = hasStale && allowStale;
      if (status) {
        status.fetch = isStale ? "stale" : "refresh";
        if (staleVal && isStale)
          status.returnedStale = true;
      }
      return staleVal ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  async forceFetch(k, fetchOptions = {}) {
    const v = await this.fetch(k, fetchOptions);
    if (v === void 0)
      throw new Error("fetch() returned undefined");
    return v;
  }
  memo(k, memoOptions = {}) {
    const memoMethod = this.#memoMethod;
    if (!memoMethod) {
      throw new Error("no memoMethod provided to constructor");
    }
    const { context, forceRefresh, ...options } = memoOptions;
    const v = this.get(k, options);
    if (!forceRefresh && v !== void 0)
      return v;
    const vv = memoMethod(k, v, {
      options,
      context
    });
    this.set(k, vv, options);
    return vv;
  }
  /**
   * Return a value from the cache. Will update the recency of the cache
   * entry found.
   *
   * If the key is not found, get() will return `undefined`.
   */
  get(k, getOptions = {}) {
    const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
    const index = this.#keyMap.get(k);
    if (index !== void 0) {
      const value = this.#valList[index];
      const fetching = this.#isBackgroundFetch(value);
      if (status)
        this.#statusTTL(status, index);
      if (this.#isStale(index)) {
        if (status)
          status.get = "stale";
        if (!fetching) {
          if (!noDeleteOnStaleGet) {
            this.#delete(k, "expire");
          }
          if (status && allowStale)
            status.returnedStale = true;
          return allowStale ? value : void 0;
        } else {
          if (status && allowStale && value.__staleWhileFetching !== void 0) {
            status.returnedStale = true;
          }
          return allowStale ? value.__staleWhileFetching : void 0;
        }
      } else {
        if (status)
          status.get = "hit";
        if (fetching) {
          return value.__staleWhileFetching;
        }
        this.#moveToTail(index);
        if (updateAgeOnGet) {
          this.#updateItemAge(index);
        }
        return value;
      }
    } else if (status) {
      status.get = "miss";
    }
  }
  #connect(p, n) {
    this.#prev[n] = p;
    this.#next[p] = n;
  }
  #moveToTail(index) {
    if (index !== this.#tail) {
      if (index === this.#head) {
        this.#head = this.#next[index];
      } else {
        this.#connect(this.#prev[index], this.#next[index]);
      }
      this.#connect(this.#tail, index);
      this.#tail = index;
    }
  }
  /**
   * Deletes a key out of the cache.
   *
   * Returns true if the key was deleted, false otherwise.
   */
  delete(k) {
    return this.#delete(k, "delete");
  }
  #delete(k, reason) {
    let deleted = false;
    if (this.#size !== 0) {
      const index = this.#keyMap.get(k);
      if (index !== void 0) {
        deleted = true;
        if (this.#size === 1) {
          this.#clear(reason);
        } else {
          this.#removeItemSize(index);
          const v = this.#valList[index];
          if (this.#isBackgroundFetch(v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (this.#hasDispose || this.#hasDisposeAfter) {
            if (this.#hasDispose) {
              this.#dispose?.(v, k, reason);
            }
            if (this.#hasDisposeAfter) {
              this.#disposed?.push([v, k, reason]);
            }
          }
          this.#keyMap.delete(k);
          this.#keyList[index] = void 0;
          this.#valList[index] = void 0;
          if (index === this.#tail) {
            this.#tail = this.#prev[index];
          } else if (index === this.#head) {
            this.#head = this.#next[index];
          } else {
            const pi = this.#prev[index];
            this.#next[pi] = this.#next[index];
            const ni = this.#next[index];
            this.#prev[ni] = this.#prev[index];
          }
          this.#size--;
          this.#free.push(index);
        }
      }
    }
    if (this.#hasDisposeAfter && this.#disposed?.length) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
    return deleted;
  }
  /**
   * Clear the cache entirely, throwing away all values.
   */
  clear() {
    return this.#clear("delete");
  }
  #clear(reason) {
    for (const index of this.#rindexes({ allowStale: true })) {
      const v = this.#valList[index];
      if (this.#isBackgroundFetch(v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k = this.#keyList[index];
        if (this.#hasDispose) {
          this.#dispose?.(v, k, reason);
        }
        if (this.#hasDisposeAfter) {
          this.#disposed?.push([v, k, reason]);
        }
      }
    }
    this.#keyMap.clear();
    this.#valList.fill(void 0);
    this.#keyList.fill(void 0);
    if (this.#ttls && this.#starts) {
      this.#ttls.fill(0);
      this.#starts.fill(0);
    }
    if (this.#sizes) {
      this.#sizes.fill(0);
    }
    this.#head = 0;
    this.#tail = 0;
    this.#free.length = 0;
    this.#calculatedSize = 0;
    this.#size = 0;
    if (this.#hasDisposeAfter && this.#disposed) {
      const dt = this.#disposed;
      let task;
      while (task = dt?.shift()) {
        this.#disposeAfter?.(...task);
      }
    }
  }
};

// src/semantic/index.ts
var dispatcherTypeMap = {
  label: "function",
  variable: "variable"
};
var allDispatchers = new Set(Object.keys(dispatcherTypeMap));
var cachedResources = new LRUCache({ max: 200 });
var funcMap = {
  label: getLabelRanges,
  variable: getVariableRanges
};
var CustomSemanticProvider = class {
  constructor() {
    this._onDidChange = new import_vscode10.EventEmitter();
    this.dispatchers = /* @__PURE__ */ new Set();
    this.onDidChangeSemanticTokens = this._onDidChange.event;
  }
  provideDocumentSemanticTokens(document, token) {
    const fileUri = getFileId(document.uri);
    const builder = new import_vscode10.SemanticTokensBuilder(legend);
    const dispatchers = this.dispatchers.size === 0 ? allDispatchers : this.dispatchers;
    let cacheMap = cachedResources.get(fileUri);
    if (!cacheMap) {
      cacheMap = /* @__PURE__ */ new Map();
      cachedResources.set(fileUri, cacheMap);
    }
    const results = [];
    for (const dispatcher of allDispatchers) {
      if (dispatchers.has(dispatcher) || !cacheMap.has(dispatcher)) {
        const rangePairs = funcMap[dispatcher](document).map((r) => [r, dispatcherTypeMap[dispatcher]]);
        cacheMap.set(dispatcher, rangePairs);
        results.push(...rangePairs);
      } else {
        results.push(...cacheMap.get(dispatcher));
      }
    }
    results.forEach((r) => builder.push(...r));
    this.dispatchers.clear();
    return builder.build();
  }
  addDispatcher(dispatcher) {
    this.dispatchers.add(dispatcher);
  }
  refresh() {
    this._onDidChange.fire();
  }
  clearCacheForUri(uri) {
    const fileUri = getFileId(uri);
    cachedResources.delete(fileUri);
  }
};
var legend = new import_vscode10.SemanticTokensLegend(["function", "variable"], []);
var provider = new CustomSemanticProvider();
function initSemanticProvider(context) {
  const {
    subscriptions
  } = context;
  subscriptions.push(import_vscode10.languages.registerDocumentSemanticTokensProvider(
    { language: "asm" },
    provider,
    legend
  ));
}
function refreshSemanticTokensFuncGenerator(dispatchor) {
  provider.addDispatcher(dispatchor);
  return () => provider.refresh();
}
var semanticTokensProvider = provider;

// src/resource/label/analyze.ts
var labelRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*):(?:.*;[ \t]*([^\n]+))?/gm;
var externalLabelRegex = /^[ \t]*(?:extrn|global)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;
var labelBehindBranchRegex = /^[ \t]*(?:CALL|RCALL|GOTO|BRA|BC|BNC|BN|BNN|BZ|BNZ|BOV|BNOV)[ \t]+([A-Za-z_\?][\dA-Za-z_\?\$]*)(?:$|[, \t;])/gmi;
var externalLabelsMap = /* @__PURE__ */ new Map();
var lastLabelAnalysisTimestamp = 0;
function callbackAfterAnalysis(delay = 100) {
  lastLabelAnalysisTimestamp = Date.now();
  scheduleWork(
    "diagnostics.updateLabels",
    () => updateLabelDiagnostics(),
    delay
  );
  scheduleWork(
    "semantic.refreshLabels",
    refreshSemanticTokensFuncGenerator("label"),
    delay + 10
  );
}
function matchLabelsInText(text, document, matchRegex, valueFactory, parseCallback) {
  return [...text.matchAll(matchRegex)].map((m) => {
    const labelName = m[1];
    const labelComment = m[2];
    const labelPosition = document.positionAt(m.index + m[0].indexOf(m[1]));
    parseCallback?.({
      name: labelName,
      comment: labelComment,
      position: labelPosition,
      match: m
    });
    return new ResourceData({
      value: valueFactory({ name: labelName, comment: labelComment }),
      uri: document.uri,
      position: labelPosition,
      range: new import_vscode11.Range(labelPosition, labelPosition.translate(0, labelName.length))
    });
  });
}
function analyzeLabelsOfDocument(document) {
  const fileUri = getFileId(document.uri);
  const text = document.getText();
  const currentFileLabelNames = /* @__PURE__ */ new Set();
  const currentFileDefineLabel = matchLabelsInText(
    text,
    document,
    labelRegex,
    ({ name, comment }) => new LabelData({
      name,
      comment: comment ?? "",
      isExternal: false
    }),
    ({ name }) => currentFileLabelNames.add(name)
  );
  if (externalLabelsMap.has(fileUri)) externalLabelsMap.get(fileUri).clear();
  else externalLabelsMap.set(fileUri, /* @__PURE__ */ new Set());
  const externalLabelNames = externalLabelsMap.get(fileUri);
  const externalLabels = matchLabelsInText(
    text,
    document,
    externalLabelRegex,
    ({ name, comment }) => new LabelData({
      name,
      comment: comment ?? "",
      isExternal: true
    }),
    ({ name }) => {
      externalLabelNames.add(name);
      currentFileLabelNames.add(name);
    }
  );
  labelManager.setLabelsOfUri(document.uri, [
    ...currentFileDefineLabel,
    ...externalLabels
  ]);
  labelManager.setBranchLabelsOfUri(document.uri, matchLabelsInText(
    text,
    document,
    labelBehindBranchRegex,
    ({ name, comment }) => new BranchLabelData({
      name,
      comment: comment ?? "",
      missing: !currentFileLabelNames.has(name)
    })
  ));
  callbackAfterAnalysis();
  labelManager.updateExternalLabelsOfFileExistence(document.uri);
}
function analyzeLabelsOfWorkspace(documents) {
  labelManager.clear();
  documents.forEach((doc) => analyzeLabelsOfDocument(doc));
  labelManager.updateExternalLabelsExistence();
  callbackAfterAnalysis();
}
function removeLabelsOfDocument(uri) {
  labelManager.removeLabelsOfUri(uri);
  callbackAfterAnalysis();
}

// src/resource/include/analyze.ts
var import_vscode12 = require("vscode");

// src/resource/include/types/include.ts
var IncludeData = class {
  constructor(props) {
    const {
      includes,
      referencedBy
    } = props;
    this.includes = includes;
    this.referencedBy = referencedBy ?? /* @__PURE__ */ new Set();
  }
};
var IncludeResource = class extends ResourceData {
};

// src/resource/include/analyze.ts
var includeRegex = /^[ \t]*(?:#?include +["'<])(.+)(?:["'>])/gm;
function analyzeIncludesOfDocument(document) {
  const text = document.getText();
  includeManager.setIncludeOfUri(document.uri, new IncludeResource({
    uri: document.uri,
    position: new import_vscode12.Position(0, 0),
    range: new import_vscode12.Range(new import_vscode12.Position(0, 0), new import_vscode12.Position(0, 0)),
    value: new IncludeData({
      includes: new Set([...text.matchAll(includeRegex)].map((m) => {
        const includeName = m[1];
        const includeUri = import_vscode12.Uri.joinPath(import_vscode12.Uri.file(document.uri.fsPath).with({
          path: import_vscode12.Uri.file(document.uri.fsPath).path.replace(/[^\/\\]+$/, "")
        }), includeName);
        return getFileId(includeUri);
      }))
    })
  }));
}
function analyzeIncludesOfWorkspace(documents) {
  includeManager.clear();
  documents.forEach((doc) => analyzeIncludesOfDocument(doc));
  includeManager.updateReferences();
}
function removeIncludesOfDocument(uri) {
  includeManager.removeIncludeOfUri(uri);
}

// src/resource/variable/analyze.ts
var import_vscode14 = require("vscode");

// src/resource/variable/diagnostic.ts
var import_vscode13 = require("vscode");
var variableCollections = import_vscode13.languages.createDiagnosticCollection("pic18-asm-variables");
function updateVariableDiagnostics() {
  variableCollections.clear();
  const diagnosticsMap = /* @__PURE__ */ new Map();
  const pushDiagnostic = (uri, diagnostic) => {
    const fileUri = getFileId(uri);
    if (diagnosticsMap.has(fileUri)) diagnosticsMap.get(fileUri).diagnostics.push(diagnostic);
    else diagnosticsMap.set(fileUri, {
      uri,
      diagnostics: [diagnostic]
    });
  };
  variableManager.fileMapUsageData.forEach((variables) => variables.forEach(({ uri, range, value: { name, exists } }) => {
    if (exists) return;
    pushDiagnostic(uri, new import_vscode13.Diagnostic(
      range,
      `Undefined variable '${name}'`,
      import_vscode13.DiagnosticSeverity.Error
    ));
  }));
  diagnosticsMap.forEach(({ uri, diagnostics }) => variableCollections.set(uri, diagnostics));
}

// src/resource/variable/types/base.ts
var BaseVariableData = class {
  constructor(props) {
    const { name } = props;
    this.name = name;
  }
};

// src/resource/variable/types/variableDefine.ts
var VariableDefineData = class extends BaseVariableData {
  constructor(props) {
    super(props);
    const { comment, value } = props;
    this.value = value;
    this.comment = comment;
  }
};
var VariableDefineResource = class extends ResourceData {
};

// src/resource/variable/usageVariableRegex.ts
var INSTRUCTIONS = "ADDWF|ADDWFC|ANDWF|CLRF|COMF|CPFSEQ|CPFSGT|CPFSLT|DECF|DECFSZ|DCFSNZ|INCF|INCFSZ|INFSNZ|IORWF|MOVF|MOVFF|MOVWF|MULWF|NEGF|RLCF|RLNCF|RRCF|RRNCF|SETF|SUBFWB|SUBWF|SUBWFB|SWAPF|TSTFSZ|XORWF|BCF|BSF|BTFSC|BTFSS|BTG|RETFIE|RETLW|RETURN|ADDLW|ANDLW|IORLW|LFSR|MOVLB|MOVLW|MULLW|SUBLW|XORLW";
var REGISTERS = "ABDEN|ABDOVF|ACKDT|ACKEN|ACKSTAT|ACQT0|ACQT1|ACQT2|ADCON0|ADCON1|ADCON2|ADCS0|ADCS1|ADCS2|ADDEN|ADEN|ADFM|ADIE|ADIF|ADIP|ADMSK1|ADMSK2|ADMSK3|ADMSK4|ADMSK5|ADON|ADRES|ADRESH|ADRESL|AN0|AN1|AN10|AN11|AN12|AN2|AN3|AN4|AN5|AN6|AN7|AN8|AN9|BANKMASK|BAUDCON|BAUDCTL|BCLIE|BCLIF|BCLIP|BF|BGST|BOR|BRG16|BRGH|BRGH1|BSR|C|C1INV|C1OUT|C1OUT_CMCON|C1OUT_PORTA|C2INV|C2OUT|C2OUT_CMCON|C2OUT_PORTA|CARRY|CCP1|CCP10|CCP1CON|CCP1IE|CCP1IF|CCP1IP|CCP1M0|CCP1M1|CCP1M2|CCP1M3|CCP1X|CCP1Y|CCP2CON|CCP2IE|CCP2IF|CCP2IP|CCP2M0|CCP2M1|CCP2M2|CCP2M3|CCP2X|CCP2Y|CCP2_PA2|CCP2_PORTB|CCP2_PORTC|CCP9E|CCPR1|CCPR1H|CCPR1L|CCPR2|CCPR2H|CCPR2L|CFGS|CHS0|CHS1|CHS2|CHS3|CHSN3|CIS|CK|CKE|CKP|CLKI|CLKO|CM0|CM1|CM2|CMCON|CMEN0|CMEN1|CMEN2|CMIE|CMIF|CMIP|CREN|CS|CSRC|CSRC1|CVR0|CVR1|CVR2|CVR3|CVRCON|CVREF|CVREN|CVROE|CVROEN|CVRR|CVRSS|D|DA|DC|DC1B0|DC1B1|DC2B0|DC2B1|DONE|DT|D_A|D_NOT_A|D_NA|EBDIS|ECCP1AS|ECCP1DEL|ECCPAS|ECCPAS0|ECCPAS1|ECCPAS2|ECCPASE|EEADR|EECON1|EECON2|EEDATA|EEFS|EEIE|EEIF|EEIP|EEPGD|FERR|FLT0|FLTS|FREE|FSR0|FSR0H|FSR0L|FSR1|FSR1H|FSR1L|FSR2|FSR2H|FSR2L|GCEN|GIE|GIEH|GIEL|GIE_GIEH|GO|GODONE|GO_DONE|GO_NOT_DONE|GO_NDONE|HLVDCON|HLVDEN|HLVDIE|HLVDIF|HLVDIN|HLVDIP|HLVDL0|HLVDL1|HLVDL2|HLVDL3|IBF|IBOV|IDLEN|INDF0|INDF1|INDF2|INT0|INT0E|INT0F|INT0IE|INT0IF|INT1|INT1E|INT1F|INT1IE|INT1IF|INT1IP|INT1P|INT2|INT2E|INT2F|INT2IE|INT2IF|INT2IP|INT2P|INTCON|INTCON2|INTCON3|INTEDG0|INTEDG1|INTEDG2|INTSRC|IOFS|IPEN|IPR1|IPR2|IRCF0|IRCF1|IRCF2|IRVST|IVRST|KBI0|KBI1|KBI2|KBI3|LA0|LA1|LA2|LA3|LA4|LA5|LA6|LA7|LATA|LATA0|LATA1|LATA2|LATA3|LATA4|LATA5|LATA6|LATA7|LATB|LATB0|LATB1|LATB2|LATB3|LATB4|LATB5|LATB6|LATB7|LATC|LATC0|LATC1|LATC2|LATC3|LATC4|LATC5|LATC6|LATC7|LATD|LATD0|LATD1|LATD2|LATD3|LATD4|LATD5|LATD6|LATD7|LATE|LATE0|LATE1|LATE2|LB0|LB1|LB2|LB3|LB4|LB5|LB6|LB7|LC0|LC1|LC2|LC3|LC4|LC5|LC6|LC7|LD0|LD1|LD2|LD3|LD4|LD5|LD6|LD7|LE0|LE1|LE2|LVDCON|LVDEN|LVDIE|LVDIF|LVDIN|LVDIP|LVDL0|LVDL1|LVDL2|LVDL3|LVV0|LVV1|LVV2|LVV3|MCLR|N|NEGATIVE|NOT_A|NOT_ADDRESS|NOT_BOR|NOT_CS|NOT_DONE|NOT_MCLR|NOT_PD|NOT_POR|NOT_RBPU|NOT_RD|NOT_RI|NOT_SS|NOT_T1SYNC|NOT_T3SYNC|NOT_TO|NOT_W|NOT_WR|NOT_WRITE|OBF|OERR|OSC1|OSC2|OSCCON|OSCFIE|OSCFIF|OSCFIP|OSCTUNE|OSTS|OV|OVERFLOW|P|P1A|P1B|P1C|P1D|P1M0|P1M1|PA1|PA2|PAGEMASK|PB2|PC|PC2|PC3E|PCFG0|PCFG1|PCFG2|PCFG3|PCL|PCLAT|PCLATH|PCLATU|PD|PD2|PDC0|PDC1|PDC2|PDC3|PDC4|PDC5|PDC6|PEIE|PEIE_GIEL|PEN|PGC|PGD|PGM|PIE1|PIE2|PIR1|PIR2|PLLEN|PLUSW0|PLUSW1|PLUSW2|POR|PORTA|PORTB|PORTC|PORTD|PORTE|POSTDEC0|POSTDEC1|POSTDEC2|POSTINC0|POSTINC1|POSTINC2|PR2|PREINC0|PREINC1|PREINC2|PROD|PRODH|PRODL|PRSEN|PSA|PSP0|PSP1|PSP2|PSP3|PSP4|PSP5|PSP6|PSP7|PSPIE|PSPIF|PSPIP|PSPMODE|PSSAC0|PSSAC1|PSSBD0|PSSBD1|PWM1CON|R|RA0|RA1|RA2|RA3|RA4|RA5|RA6|RA7|RB0|RB1|RB2|RB3|RB4|RB5|RB6|RB7|RBIE|RBIF|RBIP|RBPU|RC0|RC1|RC1IE|RC1IF|RC1IP|RC2|RC3|RC4|RC5|RC6|RC7|RC8_9|RC9|RCD8|RCEN|RCIDL|RCIE|RCIF|RCIP|RCMT|RCON|RCREG|RCSTA|RD|RD0|RD1|RD16|RD163|RD2|RD3|RD4|RD5|RD6|RD7|RDE|RE0|RE1|RE2|RE3|RI|RJPU|RSEN|RW|RX|RX9|RX9D|RXCKP|RXDTP|R_NOT_W|R_W|R_NW|S|SBOREN|SCK|SCKP|SCL|SCS0|SCS1|SDA|SDI|SDO|SEN|SENDB|SENDB1|SMP|SOSCEN|SOSCEN3|SP0|SP1|SP2|SP3|SP4|SPACE_CODE|SPACE_DATA|SPACE_EEPROM|SPBRG|SPBRGH|SPEN|SREN|SRENA|SS|SS2|SSPADD|SSPBUF|SSPCON1|SSPCON2|SSPEN|SSPIE|SSPIF|SSPIP|SSPM0|SSPM1|SSPM2|SSPM3|SSPOV|SSPSTAT|START|STATUS|STKFUL|STKOVF|STKPTR|STKUNF|STOP|SWDTE|SWDTEN|SYNC|SYNC1|T016BIT|T08BIT|T0CKI|T0CON|T0CS|T0IE|T0IF|T0PS0|T0PS1|T0PS2|T0PS3|T0SE|T13CKI|T1CKI|T1CKPS0|T1CKPS1|T1CON|T1OSCEN|T1OSI|T1OSO|T1RD16|T1RUN|T1SYNC|T2CKPS0|T2CKPS1|T2CON|T2OUTPS0|T2OUTPS1|T2OUTPS2|T2OUTPS3|T3CCP1|T3CCP2|T3CKPS0|T3CKPS1|T3CON|T3RD16|T3SYNC|TABLAT|TBLPTR|TBLPTRH|TBLPTRL|TBLPTRU|TMR0|TMR0H|TMR0IE|TMR0IF|TMR0IP|TMR0L|TMR0ON|TMR1|TMR1CS|TMR1H|TMR1IE|TMR1IF|TMR1IP|TMR1L|TMR1ON|TMR2|TMR2IE|TMR2IF|TMR2IP|TMR2ON|TMR3|TMR3CS|TMR3H|TMR3IE|TMR3IF|TMR3IP|TMR3L|TMR3ON|TO|TOS|TOSH|TOSL|TOSU|TOUTPS0|TOUTPS1|TOUTPS2|TOUTPS3|TRISA|TRISA0|TRISA1|TRISA2|TRISA3|TRISA4|TRISA5|TRISA6|TRISA7|TRISB|TRISB0|TRISB1|TRISB2|TRISB3|TRISB4|TRISB5|TRISB6|TRISB7|TRISC|TRISC0|TRISC1|TRISC2|TRISC3|TRISC4|TRISC5|TRISC6|TRISC7|TRISD|TRISD0|TRISD1|TRISD2|TRISD3|TRISD4|TRISD5|TRISD6|TRISD7|TRISE|TRISE0|TRISE1|TRISE2|TRMT|TRMT1|TUN0|TUN1|TUN2|TUN3|TUN4|TX|TX1IE|TX1IF|TX1IP|TX8_9|TX9|TX91|TX9D|TX9D1|TXCKP|TXD8|TXEN|TXEN1|TXIE|TXIF|TXIP|TXREG|TXSTA|UA|ULPWUIN|VCFG0|VCFG01|VCFG1|VCFG11|VDIRMAG|VPP|VREFN|VREFP|W4E|WAIT0|WAIT1|WCOL|WDTCON|WM0|WM1|WR|WRE|WREG|WREN|WRERR|WUE|Z|ZERO|_BOREN_NOSLP_2L|_BOREN_OFF_2L|_BOREN_ON_2L|_BOREN_SBORDIS_2L|_BORV_0_2L|_BORV_1_2L|_BORV_2_2L|_BORV_3_2L|_CCP2MX_PORTBE_3H|_CCP2MX_PORTC_3H|_CONFIG1H|_CONFIG2H|_CONFIG2L|_CONFIG3H|_CONFIG4L|_CONFIG5H|_CONFIG5L|_CONFIG6H|_CONFIG6L|_CONFIG7H|_CONFIG7L|_CP0_OFF_5L|_CP0_ON_5L|_CP1_OFF_5L|_CP1_ON_5L|_CP2_OFF_5L|_CP2_ON_5L|_CP3_OFF_5L|_CP3_ON_5L|_CPB_OFF_5H|_CPB_ON_5H|_CPD_OFF_5H|_CPD_ON_5H|_DEBUG_OFF_4L|_DEBUG_ON_4L|_DEVID1|_DEVID2|_EBTR0_OFF_7L|_EBTR0_ON_7L|_EBTR1_OFF_7L|_EBTR1_ON_7L|_EBTR2_OFF_7L|_EBTR2_ON_7L|_EBTR3_OFF_7L|_EBTR3_ON_7L|_EBTRB_OFF_7H|_EBTRB_ON_7H|_FCMEN_OFF_1H|_FCMEN_ON_1H|_IDLOC0|_IDLOC1|_IDLOC2|_IDLOC3|_IDLOC4|_IDLOC5|_IDLOC6|_IDLOC7|_IESO_OFF_1H|_IESO_ON_1H|_LPT1OSC_OFF_3H|_LPT1OSC_ON_3H|_LVP_OFF_4L|_LVP_ON_4L|_MCLRE_OFF_3H|_MCLRE_ON_3H|_OSC_ECIO6_1H|_OSC_EC_1H|_OSC_HSPLL_1H|_OSC_HS_1H|_OSC_INTIO67_1H|_OSC_INTIO7_1H|_OSC_LP_1H|_OSC_RCIO6_1H|_OSC_RC_1H|_OSC_XT_1H|_PBADEN_OFF_3H|_PBADEN_ON_3H|_PWRT_OFF_2L|_PWRT_ON_2L|_STVREN_OFF_4L|_STVREN_ON_4L|_WDTPS_1024_2H|_WDTPS_128_2H|_WDTPS_16384_2H|_WDTPS_16_2H|_WDTPS_1_2H|_WDTPS_2048_2H|_WDTPS_256_2H|_WDTPS_2_2H|_WDTPS_32768_2H|_WDTPS_32_2H|_WDTPS_4096_2H|_WDTPS_4_2H|_WDTPS_512_2H|_WDTPS_64_2H|_WDTPS_8192_2H|_WDTPS_8_2H|_WDT_OFF_2H|_WDT_ON_2H|_WRT0_OFF_6L|_WRT0_ON_6L|_WRT1_OFF_6L|_WRT1_ON_6L|_WRT2_OFF_6L|_WRT2_ON_6L|_WRT3_OFF_6L|_WRT3_ON_6L|_WRTB_OFF_6H|_WRTB_ON_6H|_WRTC_OFF_6H|_WRTC_ON_6H|_WRTD_OFF_6H|_WRTD_ON_6H|_XINST_OFF_4L|_XINST_ON_4L|NA|NADDRESS|NBOR|NCS|NDONE|NMCLR|NPD|NPOR|NRBPU|NRD|NRI|NSS|NT1SYNC|NT3SYNC|NTO|NW|NWR|NWRITE";
var usageVariableRegex = new RegExp(`(?<=^[ \\t]*(?:${INSTRUCTIONS})[ \\t](?:.*[ \\t,])?)(?<!(?:low|high|low highword)[ 	]+)(?:(?!\\d|(?:[abcfw]|low|high|highword|${REGISTERS})\\b)(?:([\\dA-Z_\\?\\$]+)\\b))(?=$|[, \\t])`, "gmi");

// src/resource/variable/types/variable.ts
var VariableData = class extends BaseVariableData {
  constructor(props) {
    super(props);
    const { exists } = props;
    this.exists = exists ?? false;
  }
};
var VariableResource = class extends ResourceData {
};

// src/resource/variable/analyze.ts
var variableEquRegex = /^[ \t]*([A-Za-z_\?][\dA-Za-z_\?\$]*)[ \t]+EQU[ \t]+(\S+)(?:.*;[ \t]*([^\n]+))?/gmi;
var variableDefineRegex = /^[ \t]*#define[ \t]+(\S+)[ \t]+([^\n]*)$/gmi;
var lastVariableAnalysisTimestamp = 0;
function callbackAfterAnalysis2(delay = 100) {
  lastVariableAnalysisTimestamp = Date.now();
  scheduleWork(
    "diagnostics.updateVariables",
    () => updateVariableDiagnostics(),
    delay
  );
  scheduleWork(
    "semantic.refreshVariables",
    refreshSemanticTokensFuncGenerator("variable"),
    delay + 10
  );
}
function analyzeVariablesOfDocument(document) {
  const fileUri = getFileId(document.uri);
  const text = document.getText();
  variableManager.setDefineVariablesOfUri(document.uri, [
    ...text.matchAll(variableEquRegex),
    ...text.matchAll(variableDefineRegex)
  ].map((m) => {
    const varName = m[1];
    const varValue = m[2];
    const varComment = m[3];
    const varPosition = document.positionAt(m.index + m[0].indexOf(m[1]));
    return new VariableDefineResource({
      value: new VariableDefineData({
        name: varName,
        value: varValue,
        comment: varComment
      }),
      uri: document.uri,
      position: varPosition,
      range: new import_vscode14.Range(varPosition, varPosition.translate(0, varName.length))
    });
  }));
  variableManager.setUsageVariablesOfUri(document.uri, [...text.matchAll(usageVariableRegex)].map((m) => {
    const varName = m[1];
    const varPosition = document.positionAt(m.index + m[0].indexOf(m[1]));
    return new VariableResource({
      value: new VariableData({
        name: varName
      }),
      uri: document.uri,
      position: varPosition,
      range: new import_vscode14.Range(varPosition, varPosition.translate(0, varName.length))
    });
  }));
  includeManager.fileMapData.get(fileUri)?.value.referencedBy.forEach((uri) => {
    const includeData = includeManager.fileMapData.get(uri);
    if (!includeData) return;
    variableManager.refreshUsageVariablesExistsOfUri(includeData.uri);
  });
  callbackAfterAnalysis2();
}
function analyzeVariablesOfWorkspace(documents) {
  variableManager.clear();
  documents.forEach((doc) => analyzeVariablesOfDocument(doc));
  variableManager.refreshAllUsageVariablesExists();
  callbackAfterAnalysis2();
}
function removeVariablesOfDocument(uri) {
  variableManager.removeDefineVariablesOfUri(uri);
  variableManager.removeUsageVariablesOfUri(uri);
  callbackAfterAnalysis2();
}

// src/subscriptions/fileWatcher.ts
function initFileSystemWatcher(context) {
  const {
    subscriptions
  } = context;
  const updateWorkspaceIndex = async () => {
    const uris = await getWorkspaceFileUris();
    const documents = await Promise.all(uris.map(async (uri) => {
      return await import_vscode15.workspace.openTextDocument(uri);
    }));
    scheduleWork("indexWorkspace", async () => {
      analyzeLabelsOfWorkspace(documents);
      analyzeIncludesOfWorkspace(documents);
      analyzeVariablesOfWorkspace(documents);
      includeManager.addReferencesRefreshCallback((uri) => {
        variableManager.refreshUsageVariablesExistsOfUri(uri);
      });
    }, 200);
  };
  updateWorkspaceIndex();
  const watcher = import_vscode15.workspace.createFileSystemWatcher(FILE_GLOBS);
  const updateFunc = async (uri) => {
    let doc;
    try {
      doc = await import_vscode15.workspace.openTextDocument(uri);
    } catch {
      return;
    }
    analyzeLabelsOfDocument(doc);
    analyzeIncludesOfDocument(doc);
    analyzeVariablesOfDocument(doc);
  };
  watcher.onDidChange(updateFunc);
  watcher.onDidDelete((uri) => {
    removeLabelsOfDocument(uri);
    removeIncludesOfDocument(uri);
    removeVariablesOfDocument(uri);
    resetCompletionCache();
    semanticTokensProvider.clearCacheForUri(uri);
  });
  subscriptions.push(watcher);
}

// src/definition/index.ts
var import_vscode18 = require("vscode");

// src/definition/label.ts
var import_vscode16 = require("vscode");
var branchRegex = new RegExp(labelBehindBranchRegex.source, "i");
var externalRegex = new RegExp(externalLabelRegex.source, "i");
function checkLabelDefinition(word, lineText, startIndex, locations) {
  const match = lineText.match(branchRegex) || lineText.match(externalRegex);
  if (!match || match.index === void 0 || startIndex !== match.index + match[0].indexOf(match[1])) return;
  locations.push(...labelManager.labelNameMapData.get(word)?.filter(
    ({ value: { isExternal } }) => !isExternal
  ).map(({ uri, position }) => new import_vscode16.Location(
    uri,
    position
  )) ?? []);
}

// src/definition/variable.ts
var import_vscode17 = require("vscode");
var variableRegex = new RegExp(usageVariableRegex.source, "i");
function checkVariableDefinition(word, lineText, startIndex, document, locations) {
  const match = lineText.match(variableRegex);
  if (!match || match.index === void 0 || startIndex !== match.index + match[0].indexOf(match[1])) return;
  const fileUri = getFileId(document.uri);
  const includeData = includeManager.recursiveIncludeMapData.get(fileUri);
  if (!includeData) return;
  includeData.forEach((uri) => {
    const variableDefineMap = variableManager.fileMapDefineData.get(uri);
    if (!variableDefineMap) return;
    const variableData = variableDefineMap.get(word);
    if (!variableData) return;
    locations.push(new import_vscode17.Location(
      variableData.uri,
      variableData.position
    ));
  });
}

// src/definition/index.ts
var lastSpaceRegex = /(^|\s|,)[^\s,]*$/;
var nextSpaceRegex = /^([^\s,]+)(?:$|\s|,)/;
var CustomDefinitionProvider = class {
  provideDefinition(document, position, token) {
    const lineText = document.lineAt(position).text;
    const spaceMatch = lineText.slice(0, position.character + 1).match(lastSpaceRegex);
    if (!spaceMatch || !spaceMatch.index) {
      return null;
    }
    const startIndex = spaceMatch.index + spaceMatch[1].length;
    const endMatch = lineText.slice(startIndex).match(nextSpaceRegex);
    if (!endMatch) {
      return null;
    }
    const word = endMatch[1];
    const locations = [];
    checkLabelDefinition(word, lineText, startIndex, locations);
    if (locations.length > 0) {
      return locations;
    }
    checkVariableDefinition(word, lineText, startIndex, document, locations);
    return locations.length ? locations : null;
  }
};
function initDefinitionProvider(context) {
  const {
    subscriptions
  } = context;
  const provider2 = new CustomDefinitionProvider();
  subscriptions.push(import_vscode18.languages.registerDefinitionProvider(
    { language: "asm" },
    provider2
  ));
}

// src/extension.ts
function activate(context) {
  initAutoCompletionProvider(context);
  initFileSystemWatcher(context);
  initDefinitionProvider(context);
  initSemanticProvider(context);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
