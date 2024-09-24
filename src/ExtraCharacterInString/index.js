// https://leetcode.com/problems/extra-characters-in-a-string/
// MEDIUM
/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function (s, dictionary) {
  const completePos = Array.from({ length: s.length }, () => [])
  const build = (index, s) => {
    const pat = dictionary[index]
    // building pat
    const lps = Array(pat.length).fill(0)
    let l = 0;
    let i = 1;
    // lps
    while (i < pat.length) {
      if (pat[i] === pat[l]) {
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

    i = 0;//s
    let j = 0;// pat
    while (s.length - i >= pat.length - j) {
      if (s[i] === pat[j]) {
        i++
        j++
        if (j === pat.length) {
          completePos[i - 1].push(pat.length)
          j = lps[j - 1]
        }
      } else {
        if (j !== 0) {
          j = lps[j - 1]
        } else {
          i++
        }
      }
    }
  }

  for (let i = 0; i < dictionary.length; i++) {
    build(i, s)
  }
  
  const dp = Array(s.length).fill(0)
  for (let i = 0; i < s.length; i++) {
    if(i > 0) {
      dp[i] = dp[i - 1]
    }
    if (completePos[i].length > 0) {
      for (const pos of completePos[i]) {
        dp[i] = Math.max(dp[i], (i >= pos ? dp[i - pos] : 0) + pos)
      }
    }
  }
  return s.length - dp[s.length - 1]
};
console.log(minExtraChar("leetscode", ["leet", "code", "leetcode"]))
// 012345
// length = 3 -> 5 -3 =2 