function shiftChar(char, shift) {
  if (!/[a-z]/.test(char) && !/[A-Z]/.test(char)) {
    return char;
  }

  const initShift = /[A-Z]/.test(char) ? 65 : 97;
  const relativePosition = char.charCodeAt(0) - initShift;

  let relativeEncoded =
    Math.abs(relativePosition + shift) <= 25
      ? relativePosition + shift
      : ((relativePosition + shift) % 25) - 1;
  relativeEncoded = relativeEncoded >= 0 ? relativeEncoded : relativeEncoded + 26;

  return String.fromCharCode(relativeEncoded + initShift);
}
function shiftStr(str, shift) {
  const a = [];
  for (const ch of str) {
    a.push(shiftChar(ch, shift));
  }
  return a.join('');
}

module.exports = { shiftStr };
