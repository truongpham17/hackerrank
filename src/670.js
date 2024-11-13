/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
  const numStr = num.toString().split('');
  for (let i = 0; i < numStr.length - 1; i++) {
    let maxIndex = -1
    let maxValue = numStr[i]
    for (let j = i + 1; j < numStr.length; j++) {
      if (numStr[j] >= maxValue) {
        maxValue = numStr[j]
        maxIndex = j
      }
    }
    if (maxIndex !== -1 && maxValue !== numStr[i]) {
      const temp = numStr[maxIndex]
      numStr[maxIndex] = numStr[i]
      numStr[i] = temp
      return Number(numStr.join(''))
    }
  }
  return num
};
console.log(maximumSwap(98368))