/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTotalCost = function (nums) {

  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    dp.push([0, 0])
  }
  dp[0][0] = nums[0];
  dp[0][1] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]) + nums[i]
    dp[i][1] = dp[i - 1][0] - nums[i]
  }

  const last = dp[nums.length - 1]
  return Math.max(last[0], last[1])
};

console.log(maximumTotalCost([8, 4, -1, -7, -3]))