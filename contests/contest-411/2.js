
/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  const dp = Array.from({ length: n }, () => [0, 0])
  dp[0][0] = energyDrinkA[0]
  dp[0][1] = energyDrinkB[0]
  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] + energyDrinkA[i], (dp[i - 2]?.[1] || 0) + energyDrinkA[i])
    dp[i][1] = Math.max(dp[i - 1][1] + energyDrinkB[i], (dp[i - 2]?.[0] || 0) + energyDrinkB[i])
  }
  return Math.max(dp[n - 1][0], dp[n - 1][1])
};
console.log(maxEnergyBoost([5, 5, 6, 3, 4, 3, 3, 4], [5, 3, 3, 4, 4, 6, 6, 3]))