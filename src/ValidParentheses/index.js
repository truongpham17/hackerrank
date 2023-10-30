// source: https://leetcode.com/problems/valid-parentheses/
/**
 * @param {string} s
 * @return {boolean}
 * ()([]{})
 */
function isOpenStack(c) {
  return c === '(' || c === '[' || c === '{';
}

function isMatchPair(open, close) {
  const pair = open + close;
  return pair === '()' || pair === '[]' || pair === '{}';
}

var isValid = function (s) {
  const openStack = [];
  const closeStack = [];
  for (let i = 0; i < s.length; i++) {
    if (isOpenStack(s[i])) {
      openStack.push(s[i]);
    } else {
      if (openStack.length === 0) return false;
      if (isMatchPair(openStack[openStack.length - 1], s[i])) {
        openStack.pop();
      } else {
        closeStack.push(s[i]);
      }
    }
  }
  return openStack.length + closeStack.length === 0;
};
