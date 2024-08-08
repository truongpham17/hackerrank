/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const zeroPos = []
  let tempOne = 0;
  let result = 0;
  for (let index = 0; index < s.length; index++) {
    const c = s[index];
    if (c === '0') {
      zeroPos.push(index)
      result += tempOne * (tempOne + 1) / 2
      tempOne = 0
    } else {
      tempOne++
    }
  }
  result += tempOne * (tempOne + 1) / 2
  // length of zero substrings
  for (let zeroCount = 1; zeroCount <= Math.sqrt(s.length); zeroCount++) {
    for (let j = 0; j + zeroCount <= zeroPos.length; j++) {
      const prevZero = j - 1 >= 0 ? zeroPos[j - 1] : -1
      const nextZero = j + zeroCount < zeroPos.length ? zeroPos[j + zeroCount] : s.length - 1
      const totalPos = nextZero - prevZero - 1
      if (totalPos >= zeroCount ** 2 + zeroCount) {
        const middleSpace = zeroPos[zeroCount + j - 1] - zeroPos[j] + 1
        const middleOnes = middleSpace - zeroCount
        const leftOnes = zeroPos[j] - prevZero - 1
        const rightOnes = zeroPos[j + zeroCount] - zeroPos[j] - 1
        const requiredOnes = totalPos - zeroCount - middleOnes
        

      }
    }
  }
  return result
};
console.log(numberOfSubstrings("101101"))