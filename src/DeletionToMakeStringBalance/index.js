// https://leetcode.com/problems/minimum-deletions-to-make-string-balanced/?envType=daily-question&envId=2024-07-30
// MEDIUM

/**
 * @param {string} s
 * @return {number}
 */
var minimumDeletions = function (s) {
  const bCount = []
  if (s[0] === 'b') {
    bCount.push(1)
  } else {
    bCount.push(0)
  }

  for (let i = 1; i < s.length; i++) {
    if (s[i] === 'b') {
      bCount.push(bCount[i - 1] + 1)
    } else {
      bCount.push(bCount[i - 1])
    }
  }

  let min = Math.min(s.length - bCount[bCount.length - 1], bCount[bCount.length - 1])
  
  if (min === 0) return 0

  for (let i = 1; i < s.length - 1; i++) {
    const b = bCount[i - 1]
    const a = s.length - i - (bCount[bCount.length - 1] - bCount[i - 1])
    if (a + b < min) {
      min = a + b
    }
  }
  return min
};
console.log(minimumDeletions('bbaaaaabb'))