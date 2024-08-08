// https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/
// MEDIUM
/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function (word) {
  const arr = new Array(26).fill(0);
  for (let i = 0; i < word.length; i++) {
    arr[c.charCodeAt(i) - 97]++;
  }

  arr.sort((a, b) => b - a)
  let count = 0;
  let result = 0;
  for (const c of arr) {
    count++
    result += (Math.floor((count - 1) / 8) + 1) * c
  }
  return result;
};