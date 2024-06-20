// https://leetcode.com/problems/sort-colors/description/
// MEDIUM
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let temp = 0
  let leftPivot = 0;
  let rightPivot = nums.length - 1;

  function swap(a, b) {
    temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp
  }

  let i = 0;
  while (i < nums.length && rightPivot >= i) {
    if (nums[i] === 0) {
      swap(i, leftPivot);
      leftPivot++;
      if (leftPivot >= i) {
        i++
      }
    } else if (nums[i] === 2) {
      swap(i, rightPivot);
      rightPivot--;
    } else {
      i++
    }
  }
  return nums;
};
console.log(sortColors([2, 0, 1]))