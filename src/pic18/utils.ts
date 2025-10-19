export function isBranchAutoComplete(linePrefix: string): boolean {
    const labelContextMatch = linePrefix.match(/(?:^|\s)(BC|BN|BNC|BNN|BNOV|BNZ|BOV|BRA|BZ|CALL|RCALL|GOTO)\s+([\dA-Za-z_\?\$]*)$/i);
    return labelContextMatch !== null
}
