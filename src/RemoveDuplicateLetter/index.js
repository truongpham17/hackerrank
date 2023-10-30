// Difficulty level: MEDIUM
// source: https://leetcode.com/problems/remove-duplicate-letters/
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  const lastIndex = new Map();
  const visitMap = new Map();
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (visitMap.get(s[i])) continue;
    let j = stack.length - 1;
    while (j >= 0) {
      if (lastIndex.get(stack[j]) > i && stack[j] > s[i]) {
        visitMap.set(stack[j], false);
        j--;
        stack.pop();
      } else {
        break;
      }
    }
    stack.push(s[i]);
    visitMap.set(s[i], true);
  }
  return stack.reduce((s, a) => s + a);
};
/**
 * bcabc
 * from [i..j] find smaller char that has not been remove?
 * s[i] mean the smallest character from i to current pivot
 * n = 10^4
 * nlogn
 *
 */
console.log(removeDuplicateLetters('cbacdcbc'));
//cdacd
//a -> c -> d
