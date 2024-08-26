/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKConstraintSubstrings = function (s, k) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    let zeroCount = 0;
    let oneCount = 0
    for (let j = i; j < s.length; j++) {
      if (s[j] === '0') {
        zeroCount++
      } else {
        oneCount++
      }
      if (zeroCount <= k || oneCount <= k) {
        result++
      }
    }
  }
  return result
};