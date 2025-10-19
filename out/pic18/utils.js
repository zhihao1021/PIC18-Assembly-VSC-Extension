export function isBranchAutoComplete(linePrefix) {
    const labelContextMatch = linePrefix.match(/^[ \t]*(BC|BN|BNC|BNN|BNOV|BNZ|BOV|BRA|BZ|CALL|RCALL|GOTO)[ \t]([\dA-Za-z_\?\$]*)$/i);
    return labelContextMatch !== null;
}
//# sourceMappingURL=utils.js.map