// source: https://leetcode.com/problems/backspace-string-compare/
// DIFFICULTY LEVEL: EASY
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let a = '';
  let b = '';
  for (const i of s) {
    if (i === '#') {
      a = a.slice(0, a.length - 1);
    } else {
      a += i;
    }
  }

  for (const i of t) {
    if (i === '#') {
      b = b.slice(0, b.length - 1);
    } else {
      b += i;
    }
  }

  return a === b;
};

console.log(backspaceCompare('abc#d', 'ab'));
