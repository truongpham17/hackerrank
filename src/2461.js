/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
  const map = new Map();
  let sum = 0;
  let slow = -k;
  let max = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (slow >= 0) {
      sum -= nums[slow]
      if (map.get(nums[slow]) > 1) {
        map.set(nums[slow], map.get(nums[slow]) - 1)
      } else {
        map.delete(nums[slow])
      }
    }
    slow++
    sum += nums[fast];
    map.set(nums[fast], (map.get(nums[fast]) || 0) + 1)
    if (map.size === k) {
      max = Math.max(sum, max)
    }
  }
  return max
};
console.log(maximumSubarraySum([9, 9, 9, 1, 2, 3], 3))