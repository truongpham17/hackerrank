/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
  let rs = 0;
  let tempC = ''
  let tempCount = 0;
  for (const c of word) {
    if (c === tempC) {
      tempCount++
    } else {
      tempCount = 0
    }
    tempC = c
    if (tempCount > 0) {
      rs++
    }
  }
  return rs + 1
};
console.log(possibleStringCount("abcccdd"))