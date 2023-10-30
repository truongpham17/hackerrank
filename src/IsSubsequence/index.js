// Difficulty level: EASY
// source: https://leetcode.com/problems/is-subsequence/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let pivot = 0;
  let curIndex = 0;
  if (s.length === 0) return true;
  while (pivot <= t.length) {
    if (t[pivot] === s[curIndex]) {
      curIndex++;
      pivot++;
      if (curIndex === s.length) return true;
    } else {
      pivot++;
    }
  }
  return false;
};

console.log(isSubsequence('axc', 'ahbgdc'));
