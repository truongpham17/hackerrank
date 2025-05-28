/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function (nums) {
  let sum = nums[0];
  let rs = sum;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] > nums[i]) {
      sum += nums[i + 1]
    } else {
      sum = nums[i + 1]
    }
    rs = Math.max(rs, sum)
  }
  return rs
};