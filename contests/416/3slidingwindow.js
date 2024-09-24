/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  if (word1.length < word2.length) return 0
  const target = {}
  for (const c of word2) {
    if (target[c]) {
      target[c]++
    } else {
      target[c] = 1
    }
  }
  let l = 0
  let r = 0;
  let count = 0
  let rs = 0;
  const dp = {}
  let shouldIncrease = true
  while (l <= r && r < word1.length) {
    const c = word1[r]
    if (shouldIncrease) {
      if (dp[c]) {
        dp[c]++
      } else {
        dp[c] = 1
      }
      if (target[c] >= dp[c]) {
        count++
      }
    }
    shouldIncrease = false


    if (count === word2.length) {
      rs += word1.length - r
      // moving l
      dp[word1[l]]--
      if (dp[word1[l]] < target[word1[l]]) {
        count--
      }
      l++
      if(r < l) {
        r = l
        shouldIncrease = true
      }
    } else {
      r++
      shouldIncrease = true
    }
  }
  return rs
};
console.log(validSubstringCount("bbbb", "b"))