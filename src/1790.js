/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function (s1, s2) {
  let difPos = -1;
  let diffCount = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      diffCount++
      if (diffCount > 2) {
        return false
      }
      if (diffCount === 1) {
        difPos = i
      } else {
        if (!(s1[difPos] === s2[i] && s1[i] === s2[difPos])) {
          return false
        }
      }
    }
  }
  if (diffCount === 1) {
    return false
  }
  return true
};