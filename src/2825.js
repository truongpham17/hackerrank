/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canMakeSubsequence = function (str1, str2) {
  let i = 0;
  let j = 0;
  while (i < str1.length && j < str2.length) {
    if (
      str1[i] === str2[j] ||
      (str1.charCodeAt(i) + 1) % 26 === str2.charCodeAt(j) % 26
    ) {
      i++
      j++
    } else {
      i++
    }
  }
  return j === str2.length
};

console.log(canMakeSubsequence('abc', 'ad'))