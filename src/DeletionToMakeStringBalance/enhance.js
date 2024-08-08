// https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/?envType=daily-question&envId=2024-07-30
// MEDIUM

/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  let sufA = 0;
  for (const c of s) {
    sufA += c === 'a'
  }

  let preB = 0

  if (sufA === 0 || sufA === s.length) {
    return 0
  }

  let result = sufA

  for (const c of s) {
    sufA -= c === 'a'
    preB += c === 'b'
    result = Math.min(result, sufA + preB)
  }
  return result
};

console.log(minimumDeletions('bbbbbbbaabbbbbaaabbbabbbbaabbbbbbaabbaaabaabbbaaaabaaababbbabbabbaaaabbbabbbbbaabbababbbaaaaaababaaababaabbabbbaaaabbbbbabbabaaaabbbaba'))
console.log(minimumDeletions('bbbbbbbaabbbbbaaabbbabbbbaabbbbbbaabbaaabaabbbaaaabaaababbbabbabbaaaabbbabbbbbaabbababbbaaaaaababaaababaabbabbbaaaabbbbbabbabaaaabbbaba'))