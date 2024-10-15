/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
  let rs = 0
  let count = 0;
  for (const c of s) {
    if (c === '(') {
      count++
    } else {
      if (count > 0) {
        count--
      } else {
        rs++
      }
    }
  }
  return rs + count
};