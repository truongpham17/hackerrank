// https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/
// MEDIUM
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  const data = []
  let temp = ''
  function reverseString(s) {
    let reverse = ''
    for (let i = s.length - 1; i >= 0; i--) {
      reverse += s[i]
    }
    return reverse
  }
  for (const c of s) {
    if (c === '(') {
      reverseCount++
      data.push(temp)
      temp = ''
    } else if (c === ')') {
      temp = reverseString(temp)
      if (data.length > 0) {
        temp = data[data.length - 1] + temp;
      }
      data.pop()
    } else {
      temp += c
    }
  }
  return temp
};
console.log(reverseParentheses("((eqk((h))))"))