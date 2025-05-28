/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let zero = 0;
  let one = 0
  for (const c of s) {
    if (c === '0') {
      zero++
    } else {
      one++
    }
  }
  let tempZero = 0;
  let max = 0
  for (let i = 0; i < s.length - 1; i++) {
    const c = s[i]
    if (c === '0') {
      tempZero++
    } else {
      one--
    }
    max = Math.max(tempZero + one, max)
  }
  return max
};