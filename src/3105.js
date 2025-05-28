/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function (nums) {
  let increase = 1;
  let decrease = 1;
  let rs = 1
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] > nums[i]) {
      increase++
    } else {
      increase = 1
    }
    if (nums[i + 1] < nums[i]) {
      decrease++
    } else {
      decrease = 1
    }
    rs = Math.max(increase, decrease, rs)
  }
  return rs
};