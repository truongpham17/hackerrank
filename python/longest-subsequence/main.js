/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const ar = []
  for (let i = 0; i < text1.length; i++) {
    ar.push([])
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        ar[i].push((ar[i - 1]?.[j - 1] ?? 0) + 1)
      } else {
        ar[i].push(Math.max(ar[i - 1]?.[j] ?? 0, ar[i]?.[j - 1] ?? 0))
      }
    }
  }
  return ar[text1.length - 1][text2.length - 1]
};