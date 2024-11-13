/**
 * @param {number[]} nums
 * @return {number}
 */
var maxIncreasingSubarrays = function (nums) {
  const n = nums.length;
  const dp = Array(n).fill(1)
  let rs = 0;
  const b = []
  for (let i = 1; i < n; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1
      rs = Math.max(rs, Math.floor(dp[i] / 2))
    } else {
      if (dp[i - 1] > 0) {
        b.push(dp[i - 1])
      }
    }
  }
  if (dp[n - 1] > 0) {
    b.push(dp[n - 1])
  }
  // compare
  for (let i = 1; i < b.length; i++) {
    rs = Math.max(rs, Math.min(b[i - 1], b[i]))
  }
  return rs
};
console.log(maxIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1]))
console.log(maxIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7]))

console.log(maxIncreasingSubarrays([1, 2, 3, 4]))
console.log(maxIncreasingSubarrays([1, 2, 3, 4, 5]))