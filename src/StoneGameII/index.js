// https://leetcode.com/problems/stone-game-ii/description/?envType=daily-question&envId=2024-08-20
// MEDIUM
/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const n = piles.length

  // prefix sum
  const ps = []
  let sum = 0;
  for (const pile of piles) {
    sum += pile
    ps.push(sum)
  }

  const dp = Array.from({ length: piles.length }, () => Array(piles.length + 1).fill(null))

  const cal = (isAlice, idx, m) => {
    if (idx >= n) return 0
    if (dp[idx][m] !== null) {
      return dp[idx][m]
    }

    let result = 0;
    // asume get from 1 to 2 * m
    for (let i = 1; i <= 2 * m; i++) {
      // over n
      if (idx + i >= n + 1) {
        break
      }

      const sum = ps[ps.length - 1] - (idx > 0 ? ps[idx - 1] : 0) - cal(!isAlice, idx + i, Math.max(i, m))
      result = Math.max(result, sum)
    }
    dp[idx][m] = result
    return result
  }
  return cal(true, 0, 1)
};
console.log(stoneGameII([1]))