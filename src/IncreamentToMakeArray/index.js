// https://leetcode.com/problems/minimum-increment-to-make-array-unique/description/?envType=daily-question&envId=2024-06-14
// MEDIUM

/**
 * @param {number[]} nums
 * @return {number}
 */
var minIncrementForUnique = function (nums) {
  nums.sort((a, b) => a - b);
  let min = nums[0];
  let step = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= min) {
      min += 1
      step += min - nums[i]
    } else {
      min = nums[i]
    }
  }
  return step;
};