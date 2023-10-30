// Difficulty level: EASY
// source: https://leetcode.com/problems/sort-array-by-parity/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  let leftPointer = 0;
  let rightPointer = nums.length - 1;
  while (leftPointer < rightPointer) {
    if (nums[leftPointer] % 2 === 1 && nums[rightPointer] % 2 === 0) {
      [nums[leftPointer], nums[rightPointer]] = [
        nums[rightPointer],
        nums[leftPointer],
      ];
      leftPointer++;
      rightPointer--;
      continue;
    }
    if (nums[leftPointer] % 2 !== 1) {
      leftPointer++;
    }
    if (nums[rightPointer] % 2 !== 0) {
      rightPointer--;
    }
  }
  return nums;
};

console.log(sortArrayByParity([3, 1, 2, 4, 3, 6]));
