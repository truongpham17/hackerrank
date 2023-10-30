// source: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/?envType=daily-question&envId=2023-10-09
// Difficulty level: MEDIUM
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  return [
    findLeft(nums, 0, nums.length - 1, target),
    findRight(nums, 0, nums.length - 1, target),
  ];
};

function findLeft(nums, start, end, target) {
  if (start > end) return -1;
  const middle = Math.floor((start + end) / 2);

  if (nums[middle] === target && (middle - 1 < 0 || nums[middle - 1] < target))
    return middle;

  if (nums[middle] >= target) {
    return findLeft(nums, start, middle - 1, target);
  }

  return findLeft(nums, middle + 1, end, target);
}

function findRight(nums, start, end, target) {
  if (start > end) return -1;
  const middle = Math.floor((start + end) / 2);
  if (
    nums[middle] === target &&
    (middle + 1 >= nums.length || nums[middle + 1] > target)
  )
    return middle;

  if (nums[middle] <= target) {
    return findRight(nums, middle + 1, end, target);
  }

  return findRight(nums, start, middle - 1, target);
}

console.log(searchRange([1], 1));
