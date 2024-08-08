/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function (s, x, y) {
  let score = 0;
  const higherString = x > y ? 'ab' : 'ba'
  const lowerString = x > y ? 'ba' : 'ab'
  const [firstChar, secChar] = higherString
  const higherScore = Math.max(x, y)
  const lowerScore = Math.min(x, y)
  const abStack = []
  const getLastTwoElements = arr => {
    if (arr.length < 2) return ''
    return arr[arr.length - 2] + arr[arr.length - 1]
  }
  for (const c of s) {
    abStack.push(c)
    if (c === firstChar || c === secChar) {
      while (getLastTwoElements(abStack) === higherString) {
        score += higherScore
        abStack.pop()
        abStack.pop()
      }
    }
    if (c !== firstChar && c !== secChar) {
      const newStack = []
      for (const cc of abStack) {
        newStack.push(cc);
        while (getLastTwoElements(newStack) === lowerString) {
          score += lowerScore
          newStack.pop()
          newStack.pop()
        }
      }
      abStack.length = 0
    }
  }
  const newStack = []
  for (const cc of abStack) {
    newStack.push(cc);
    while (getLastTwoElements(newStack) === lowerString) {
      score += lowerScore
      newStack.pop()
      newStack.pop()
    }
  }
  return score;
};

console.log(maximumGain('cbaabwbbbabbwaaq', 4074, 9819))