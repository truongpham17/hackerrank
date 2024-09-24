// https://leetcode.com/problems/shortest-palindrome/?envType=daily-question&envId=2024-09-20
// HARD
// KMP
/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function (s) {
  const revert = []
  for (let i = s.length - 1; i >= 0; i--) {
    revert.push(s[i])
  }

  // create lps for s
  let l = 0;
  let i = 1;
  const lps = new Array(s.length).fill(0)
  while (i < s.length) {
    if (s[i] === s[l]) {
      l++
      lps[i] = l
      i++
    } else {
      if (l !== 0) {
        l = lps[l - 1]
      } else {
        i++
      }
    }
  }

  // revert 
  i = 0
  // pattern, original
  j = 0
  let max = 0
  while (i < revert.length) {
    if (revert[i] === s[j]) {
      if (s.length - j - 1 > i) {
        if (i + j + 2 === s.length) {
          if ((j + 1) * 2 > max) {
            max = (j + 1) * 2
          }
        } else if (i + j + 2 === s.length - 1) {
          if ((j + 1) * 2 + 1 > max) {
            max = (j + 1) * 2 + 1
          }
        }
      }

      i++;
      j++;
    } else {
      if (j !== 0) {
        j = lps[j - 1]
      } else {
        i++
      }
    }
  }

  for (let i = Math.max(max, 1); i < s.length; i++) {
    revert.push(s[i])
  }

  let rs = ''
  for (let i = revert.length - 1; i >= 0; i--) {
    rs += revert[i]
  }
  return rs
};
console.log(shortestPalindrome("abcd"))
