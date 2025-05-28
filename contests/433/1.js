/**
 * @param {number[]} nums
 * @return {number}
 */
var subarraySum = function (nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    const l = Math.max(0, i - nums[i])
    for (let j = l; j = i; j++) {
      sum += nums[i]
    }
  }
  return sum
};