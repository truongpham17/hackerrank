/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var findPermutationDifference = function (s, t) {
  const sMap = new Map();
  for (let i = 0; i < s.length; i++) {
    sMap.set(s[i], i)
  }
  let result = 0;
  for (let i = 0; i < t.length; i++) {
    result += Math.abs(sMap.get(t[i]) - i)
  }
  return result
};
console.log(findPermutationDifference("abcde", "edbac"))