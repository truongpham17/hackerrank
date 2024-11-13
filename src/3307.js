/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function (k, operations) {
  const step = []
  let temp = k - 1;
  while (temp > 0) {
    const log = Math.floor(Math.log2(temp));
    step.push(log)
    temp -= 2 ** log
  }
  let curChar = 'a'
  let curStepIndex = step.length - 1;
  for (let i = 0; i < operations.length; i++) {
    if (i === step[curStepIndex]) {
      if (operations[i] === 1) {
        curChar = moveToNextChar(curChar)
      }
      curStepIndex--
      if (curStepIndex < 0) break
    }
  }

  return curChar

};

function moveToNextChar(char) {
  if (char >= 'a' && char <= 'z') {
    return String.fromCharCode((char.charCodeAt(0) + 1 - 97) % 26 + 97);
  } else if (char >= 'A' && char <= 'Z') {
    return String.fromCharCode((char.charCodeAt(0) + 1 - 65) % 26 + 65);
  } else {
    return char;
  }
}
console.log(kthCharacter(100000000000000, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]))