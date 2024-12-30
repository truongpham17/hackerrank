/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const dp = Array(high + 1).fill(0)
  dp[zero] += 1
  dp[one] += 1
  const MOD = (10 ** 9 + 7)
  for (let i = 0; i <= high; i++) {
    dp[i] += (dp[i - zero] || 0) + (dp[i - one] || 0)
    dp[i] %= MOD
  }
  let rs = 0
  for (let i = low; i <= high; i++) {
    rs += dp[i]
    rs %= MOD
  }
  return rs %= MOD
};