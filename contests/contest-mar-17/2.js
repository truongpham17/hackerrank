/**
 * @param {string} s
 * @param {character} c
 * @return {number}
 */
var countSubstrings = function (s, c) {
  let count = 0;
  for (char of s) {
    if (char === c) {
      count++
    }
  }
  const mul = (x) => {
    if (x <= 1) return x
    return x * mul(x - 1)
  }
  return count * count * (count - 1 ) /2
};