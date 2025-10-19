export const INSTRUCTION_DETAILS = [
    {
        name: "ADDLW",
        content: `#### ADDLW
ADD Literal to W

|||
|---|---|
| Syntax:          | \`ADDLW k\` |
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | (W) + k → W |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) + (f) → dest |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) + (f) + (C) → dest |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | (W) .AND. k → W |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) .AND. (f) → dest |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | if Carry bit is '1', (PC) + 2 + 2n → PC |
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
| Operands:        | 0 ≤ f ≤ 255 0 ≤ b ≤ 7 a ∈ [0,1] |
| Operation:       | 0 → f<b> |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | If Negative bit is '1', (PC) + 2 + 2n → PC |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | If Carry bit is '0', (PC) + 2 + 2n → PC |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | If Negative bit is '0', (PC) + 2 + 2n → PC |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | if Overflow bit is '0', (PC) + 2 + 2n → PC |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | if Zero bit is '0', (PC) + 2 + 2n → PC |
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
| Operands:        | -1024 ≤ n ≤ 1023 |
| Operation:       | (PC) + 2 + 2n → PC |
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
| Operands:        | 0 ≤ f ≤ 255 0 ≤ b ≤ 7 a ∈ [0,1] |
| Operation:       | 1 → f<b> |
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
| Operands:        | 0 ≤ f ≤ 255 0 ≤ b ≤ 7 a ∈ [0,1] |
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
| Operands:        | 0 ≤ f ≤ 255 0 ≤ b ≤ 7 a ∈ [0,1] |
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
| Operands:        | 0 ≤ f ≤ 255 0 ≤ b ≤ 7 a ∈ [0,1] |
| Operation:       | (f<b>) → f<b> |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | If Overflow bit is '1', (PC) + 2 + 2n → PC |
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
| Operands:        | -128 ≤ n ≤ 127 |
| Operation:       | if Zero bit is '1', (PC) + 2 + 2n → PC |
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
| Operands:        | 0 ≤ k ≤ 1048575 s ∈ [0,1] |
| Operation:       | (PC) + 4 → TOS, k → PC<20:1>; if s = 1, (W) → WS, (STATUS) → STATUSS, (BSR) → BSRS |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
| Operation:       | 000h → f, 1 → Z |
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
| Operation:       | 000h → WDT, 000h → WDT postscaler, 1 → TO, 1 → PD |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) → dest |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
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
If REG ≠ W; PC = Address (NEQUAL)`
    },
    {
        name: "CPFSGT",
        content: `#### CPFSGT
Compare f with W, Skip if f > W

|||
|---|---|
| Syntax:          | \`CPFSGT f {,a}\` |
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
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
If REG ≤ W; PC = Address (NOGREATER)`
    },
    {
        name: "CPFSLT",
        content: `#### CPFSLT
Compare f with W, Skip if f < W

|||
|---|---|
| Syntax:          | \`CPFSLT f {,a}\` |
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
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
If REG ≥ W; PC = Address (NLESS)`
    },
    {
        name: "DAW",
        content: `#### DAW
Decimal Adjust W Register

|||
|---|---|
| Syntax:          | \`DAW\` |
| Operands:        | None |
| Operation:       | If [W<3:0> > 9] or [DC = 1] then, (W<3:0>) + 6 → W<3:0>; else, (W<3:0>) → W<3:0>; |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) - 1 → dest |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) - 1 → dest, skip if result = 0 |
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
if CNT ≠ 0: PC = Address (HERE + 2)`
    },
    {
        name: "DCFSNZ",
        content: `#### DCFSNZ
Decrement f, Skip if Not 0

|||
|---|---|
| Syntax:          | \`DCFSNZ f {,d {,a}}\` |
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) - 1 → dest, skip if result ≠ 0 |
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
if TEMP ≠ 0: PC = Address (NZERO)`
    },
    {
        name: "GOTO",
        content: `#### GOTO
Unconditional Branch

|||
|---|---|
| Syntax:          | \`GOTO k\` |
| Operands:        | 0 ≤ k ≤ 1048575 |
| Operation:       | k → PC<20:1> |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) + 1 → dest |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) + 1 → dest, skip if result = 0 |
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
If CNT ≠ 0; PC = Address (NZERO)`
    },
    {
        name: "INFSNZ",
        content: `#### INFSNZ
Increment f, Skip if Not 0

|||
|---|---|
| Syntax:          | \`INFSNZ f {,d {,a}}\` |
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) + 1 → dest, skip if result ≠ 0 |
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
If REG ≠ 0; PC = Address (NZERO)`
    },
    {
        name: "IORLW",
        content: `#### IORLW
Inclusive OR Literal with W

|||
|---|---|
| Syntax:          | \`IORLW k\` |
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | (W) .OR. k → W |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) .OR. (f) → dest |
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
| Operands:        | 0 ≤ f ≤ 2 0 ≤ k ≤ 4095 |
| Operation:       | k → FSRf |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | f → dest |
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
| Operands:        | 0 ≤ fs ≤ 4095 0 ≤ fd ≤ 4095 |
| Operation:       | (fs) → fd |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | k → BSR |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | k → W |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
| Operation:       | (W) → f |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | (W) x k → PRODH:PRODL |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
| Operation:       | (W) x (f) → PRODH:PRODL |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
| Operation:       | (f) + 1 → f |
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
| Operation:       | (TOS) → bit bucket |
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
| Operation:       | (PC + 2) → TOS |
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
| Operands:        | -1024 ≤ n ≤ 1023 |
| Operation:       | (PC) + 2 → TOS, (PC) + 2 + 2n → PC |
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
| Operands:        | s ∈ [0,1] |
| Operation:       | (TOS) → PC, 1 → GIE/GIEH or PEIE/GIEL; if s = 1, (WS) → W, (STATUSS) → STATUS, (BSRS) → BSR, PCLATU, PCLATH are unchanged |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | k → W, (TOS) → PC, PCLATU, PCLATH are unchanged |
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
| Operands:        | s ∈ [0,1] |
| Operation:       | (TOS) → PC; if s = 1, (WS) → W, (STATUSS) → STATUS, (BSRS) → BSR, PCLATU, PCLATH are unchanged |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f<n>) → dest<n + 1>, (f<7>) → C, (C) → dest<0> |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f<n>) → dest<n + 1>, (f<7>) → dest<0> |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f<n>) → dest<n - 1>, (f<0>) → C, (C) → dest<7> |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f<n>) → dest<n - 1>, (f<0>) → dest<7> |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
| Operation:       | FFh → f |
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
| Operation:       | 00h → WDT, 0 → WDT postscaler, 1 → TO, 0 → PD |
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
TO = 1↑  
PD = 0

↑ If WDT causes wake-up, this bit is cleared.`
    },
    {
        name: "SUBFWB",
        content: `#### SUBFWB
Subtract f from W with Borrow

|||
|---|---|
| Syntax:          | \`SUBFWB f {,d {,a}}\` |
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) – (f) – (C) → dest |
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
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | k – (W) → W |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) – (W) → dest |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f) – (W) – (C) → dest |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (f<3:0>) → dest<7:4>, (f<7:4>) → dest<3:0> |
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
| Operation:       | if TBLRD *, (Prog Mem (TBLPTR)) → TABLAT, TBLPTR – No Change; if TBLRD *+, (Prog Mem (TBLPTR)) → TABLAT, (TBLPTR) + 1 → TBLPTR; if TBLRD *-, (Prog Mem (TBLPTR)) → TABLAT, (TBLPTR) – 1 → TBLPTR; if TBLRD +*, (TBLPTR) + 1 → TBLPTR, (Prog Mem (TBLPTR)) → TABLAT |
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
| Operation:       | if TBLWT *, (TABLAT) → Holding Register, TBLPTR → No Change; if TBLWT *+, (TABLAT) → Holding Register, (TBLPTR) + 1 → TBLPTR; if TBLWT *-, (TABLAT) → Holding Register, (TBLPTR) – 1 → TBLPTR; if TBLWT +*, (TBLPTR) + 1 → TBLPTR, (TABLAT) → Holding Register |
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
| Operands:        | 0 ≤ f ≤ 255 a ∈ [0,1] |
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
if CNT ≠ 00h, PC = Address (NZERO)`
    },
    {
        name: "XORLW",
        content: `#### XORLW
Exclusive OR Literal with W

|||
|---|---|
| Syntax:          | \`XORLW k\` |
| Operands:        | 0 ≤ k ≤ 255 |
| Operation:       | (W) .XOR. k → W |
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
| Operands:        | 0 ≤ f ≤ 255 d ∈ [0,1] a ∈ [0,1] |
| Operation:       | (W) .XOR. (f) → dest |
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
export const INSTRUCTION_DETAILS_MAP = new Map(INSTRUCTION_DETAILS.map(detail => [detail.name, detail.content]));
//# sourceMappingURL=instruction_detail.js.map