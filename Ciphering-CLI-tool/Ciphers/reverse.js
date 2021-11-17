function reverseChar(char) {
  if (!/[a-z]/.test(char) && !/[A-Z]/.test(char)) {
    return char;
  }
  const initShift = /[A-Z]/.test(char) ? 65 : 97;
  const relativePosition = char.charCodeAt(0) - initShift;
  const reversedABC = [...Array(26).keys()]
    .map((i) => String.fromCharCode(i + initShift))
    .reverse();
  const reversedChar = reversedABC[relativePosition];
  return reversedChar;
}

function reverseStr(str) {
  const a = [];
  for (const ch of str) {
    a.push(reverseChar(ch));
  }
  return a.join('');
}

module.exports = { reverseStr };
