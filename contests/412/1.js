/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  for (let i = 0; i < k; i++) {
    let minIndex = 0;
    let min = 10 ** 10
    for (let j = 0; j < nums.length; j++) {
      if (min > nums[j]) {
        minIndex = j
        min = nums[j]
      }
    }
    nums[minIndex] *= multiplier
  }
  return nums
};

console.log(getFinalState([2, 1, 3, 5, 6], 5, 2))