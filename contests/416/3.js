/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  const dp = Array.from({ length: word1.length }, () => new Map())
  const firstChar = word1[0]
  dp[0].set(firstChar, 1)
  for (let i = 1; i < word1.length; i++) {
    const c = word1[i]
    dp[i] = new Map(dp[i - 1])
    if (dp[i].has(c)) {
      dp[i].set(c, dp[i].get(c) + 1)
    } else {
      dp[i].set(c, 1)
    }
  }


  const target = new Map();
  for (const c of word2) {
    if (target.has(c)) {
      target.set(c, target.get(c) + 1)
    } else {
      target.set(c, 1)
    }
  }

  const binary = (start, pivot) => {
    let l = start;
    let r = word1.length - 1
    let result = -1
    let finalLeft = null
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      const left = new Map();
      for (const c of target.keys()) {
        left.set(c, dp[mid].get(c) - (pivot > 0 ? (dp[pivot - 1].get(c) || 0) : 0) || 0)
      }

      let isEnough = true
      for (const c of target.keys()) {
        if (left.get(c) < target.get(c)) {
          l = mid + 1
          isEnough = false
          break
        }
      }
      if (isEnough) {
        result = mid
        finalLeft = left
        r = mid - 1
      }
    }
    if (result !== -1) {
      for (const c of target.keys()) {
        finalLeft.set(c, target.get(c) - finalLeft.get(c))
      }
    }
    return [result, finalLeft]
  }
  let rs = 0
  let finalLeft
  let saveNext = -1

  for (let i = 0; i <= word1.length - word2.length; i++) {
    const c = word1[i]
    if (finalLeft && finalLeft.has(c) && finalLeft.get(c) > 0) {
      finalLeft.set(c, finalLeft.get(c) - 1)
      rs += word1.length - saveNext
    } else {
      const [next, innerLeft] = binary(Math.max(i + word2.length - 1, saveNext), i)
      if (next !== -1) {
        rs += word1.length - next
        finalLeft = innerLeft
        saveNext = next
      } else {
        finalLeft = null
      }
    }
  }
  return rs
};
console.log(validSubstringCount("dddddededddeeeddd", "eee"))