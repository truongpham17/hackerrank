// https://leetcode.com/problems/longest-palindrome/?envType=daily-question&envId=2024-06-10
// EASY
/**
 * @param {string} s
 * @return {number}
 * 0 1 2 3 
 */
var longestPalindrome = function (s) {
  let newS = ""
  for (const c of s) {
    newS += c + " "
  }
  newS = newS.substring(0, newS.length - 1)
  console.log("🚀 ~ longestPalindrome ~ newS:", newS)
  let longest = 1;
  for (let i = 0; i < s.length; i++) {
    let temp = newS[i] !== " " ? 1 : 0;
    for (let j = 1; j < Math.min(i - 1, newS.length - i); j++) {
      if (newS[i - j] === newS[i + j]) {
        if (newS[i - j] !== " ") {
          temp += 2
        }
      } else {
        break;
      }
    }
    if (temp > longest) {
      longest = temp
    }
  }
  return longest
};
console.log(longestPalindrome("abccccdd"))