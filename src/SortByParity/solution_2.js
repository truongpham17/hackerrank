// Difficulty level: EASY
// source: https://leetcode.com/problems/sort-array-by-parity/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let pivot = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      [nums[i], nums[pivot]] = [nums[pivot], nums[i]];
      pivot++;
    }
  }
  return nums;
};

console.log(sortArrayByParity([0, 1, 2]));
