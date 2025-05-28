/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}a
 */
var hasSpecialSubstring = function (s, k) {
  let curL = 0;
  let curC = ''
  for (const c of s) {
    if (c === curC) {
      curL++
    } else {
      if (curL === k) {
        return true;
      }
      curL = 1;
      curC = c
    }
  }
  if (curL === k) {
    return true
  }
  return false
};
console.log(hasSpecialSubstring("", 3))