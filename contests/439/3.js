/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} m
 * @return {number}
 */
var maxSum = function (nums, k, m) {
  const n = nums.length;
  const sumTable = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    sumTable[i] = nums[i - 1] + sumTable[i - 1];
  }

  const dp = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(-Infinity));

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 0;
  }

  for (let j = 1; j <= k; j++) {
    let iMax = -Infinity;
    for (let i = j * m; i <= n; i++) {
      iMax = Math.max(iMax, dp[i - m][j - 1] - sumTable[i - m]);
      dp[i][j] = Math.max(dp[i - 1][j], sumTable[i] + iMax);
    }
  }

  return dp[n][k];
};
