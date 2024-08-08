// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

//MEDIUM
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a)
  return nums[k]
}