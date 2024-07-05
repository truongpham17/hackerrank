/**
 * @param {number[]} nums
 * @return {number}
 */
var minDifference = function (nums) {
  if (nums.length < 5) {
    return 0
  }
  nums.sort((a, b) => a - b)
  return Math.min(
    nums[nums.length - 4] - nums[0],
    nums[nums.length - 3] - nums[1],
    nums[nums.length - 2] - nums[2],
    nums[nums.length - 1] - nums[3]
  )
};
console.log(minDifference([82, 81, 95, 75, 20]))
// [82,81,95,75,20] -> 20 75 95 81 82