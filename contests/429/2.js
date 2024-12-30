/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  nums.sort((a, b) => a - b)
  let max = nums[nums.length - 1] + k + 1
  for (let i = nums.length - 1; i >= 0; i--) {
    nums[i] = Math.max(Math.min(max - 1, nums[i] + k), nums[i] - k)
    max = nums[i]
  }

  const set = new Set()
  for (const num of nums) {
    set.add(num)
  }

  return set.size
};
console.log(maxDistinctElements([1, 2, 2, 3, 3, 4], 2))