function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

/**
 * @param {number[]} nums
 * @return {number}
*/
var subsequencePairCount = function (nums) {
  const MOD = 10 ** 9 + 7
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => new Map())
  let rs = 0;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (i === j) {
        dp[i].set(nums[i], 1)
      } else {
        const entries = Array.from(dp[i])
        for (const [key, count] of entries) {
          const newGCD = gcd(nums[j], key)
          if (dp[i].has(newGCD)) {
            dp[i].set(newGCD, (dp[i].get(newGCD) + count) % MOD)
          } else {
            dp[i].set(newGCD, count % MOD)
          }
        }
      }
      // already updated
      for (let k = j + 1; k < n; k++) {
        // console.log(i, j, k, dp[i], dp[k])
        for (const key of dp[k].keys()) {
          if (dp[i].has(key)) {
            rs += dp[i].get(key) * dp[k].get(key)
            rs %= MOD
          }
        }
      }
    }
  }
  return rs * 2
};
console.log(subsequencePairCount([1, 2, 3, 4]))

console.log(subsequencePairCount([1, 1, 1, 1]))
// console.log(subsequencePairCount([10, 20, 30]))