/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, m, n) {
  const dp = Array(high + 1).fill(0)
  dp[m] += 1
  dp[n] += 1
  const MOD = (10 ** 9 + 7)

  for (let i = 0; i <= high; i++) {
    dp[i] += (dp[i - m] || 0) + (dp[i - n] || 0)
    dp[i] %= MOD
  }

  let rs = 0

  for (let i = low; i <= high; i++) {
    rs += dp[i]
    rs %= MOD
  }
  return rs %= MOD
};