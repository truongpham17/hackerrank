/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumOfGoodNumbers = function (nums, k) {
  let sum = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i - k >= 0 && nums[i - k] >= nums[i]) continue;
    if (i + k < n && nums[i + k] >= nums[i]) continue;
    sum += nums[i]
  }
  return sum;
};