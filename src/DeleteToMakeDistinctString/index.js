// source: https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/?envType=daily-question&envId=2023-09-12
// Difficulty level: MEDIUM
/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
  // 5 5 4 4 4 2
  // 5 4 4 4 4 2
  // 5 4 3 2 1 2 => 0
  //
  // => done
  const map = new Map();

  for (let i = 97; i <= 122; i++) {
    map.set(String.fromCharCode(i), 0);
  }

  for (const char of s) {
    map.set(char, map.get(char) + 1);
  }
  const array = [];

  for (const [key, value] of map) {
    array.push(value);
  }

  array.sort((a, b) => a - b);
};
