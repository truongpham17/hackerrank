/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
  const n = nums.length
  const isGood = (index) => {
    if (index + k - 1 >= nums.length) return false
    for (let i = index + 1; i < index + k; i++) {
      if (nums[i] <= nums[i - 1]) return false
    }
    return true
  }
  for (let i = 0; i < n; i++) {
    if (isGood(i)) {
      if (isGood(i + k)) {
        return true
      }
    }
  }
  return false
};
console.log(hasIncreasingSubarrays([1,2,1,],2))