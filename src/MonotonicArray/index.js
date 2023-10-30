// Difficulty level: EASY
// source: https://leetcode.com/problems/monotonic-array/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
  if (nums.length <= 1) return true;
  let direction = 0; // 1 increase, -1 decrease
  let i = -1;
  while (direction === 0 && i < nums.length - 1) {
    i++;
    if (nums[i] < nums[i + 1]) {
      direction = 1;
    } else if (nums[i] > nums[i + 1]) {
      direction = -1;
    }
  }
  for (let j = i; j < nums.length - 1; j++) {
    if ((nums[j + 1] - nums[j]) * direction < 0) return false;
  }
  return true;
};

console.log(isMonotonic([6, 6, 4, 1, 6, 3]));
