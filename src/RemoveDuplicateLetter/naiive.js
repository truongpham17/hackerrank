// Difficulty level: MEDIUM
// source: https://leetcode.com/problems/remove-duplicate-letters/
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // count number
  // can be remove or not = 0
  // must be remove = 1
  // must be included = 2
  const map = new Map();
  for (const char of s) {
    if (!map.has(char)) {
      map.set(char, { count: 1, status: 2 });
    } else {
      const data = map.get(char);
      data.count++;
      data.status = 0;
    }
  }
  let result = '';
  for (let i = 0; i < s.length; i++) {
    const data = map.get(s[i]);
    if (data.status === 1) continue;
    if (data.status === 2) {
      result += s[i];
      continue;
    }
    if (i + 1 < s.length) {
      // not remove
      if (s[i] < s[i + 1]) {
        result += s[i];
        data.status = 1;
        continue;
      }
      // remove
      if (data.count > 2) {
        data.count--;
      } else {
        data.count--;
        data.status = 2;
      }
    } else {
      result += s[i];
    }
  }
  return result;
};

console.log(removeDuplicateLetters('cbacdcbc'));
// find all duplicate
// what will you remove a__b____a_____? first a or last a?
// cbacdcbc
//
// bacdcbc
// acdcbc
// adcbc
// adbc
// acdb
