// Difficulty level: EASY
// source: https://leetcode.com/problems/find-the-difference/solutions/1752248/c-6-approach-from-view-of-sort-count-xor-sum/
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let xor = 0;
  for (let i = 0; i < s.length; i++) {
    xor = s.charCodeAt(i) ^ xor;
    xor = t.charCodeAt(i) ^ xor;
  }
  xor = t.charCodeAt(t.length - 1) ^ xor;
  return String.fromCharCode(xor);
};
