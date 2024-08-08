// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

//MEDIUM
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const freq = {}
  let max = -(10 ** 4)
  for (const num of nums) {
    if (num > max) {
      max = num
    }
    if (num in freq) {
      freq[num]++
    } else {
      freq[num] = 1
    }
  }
  let i = max;
  let count = 0;
  while (true) {
    if (i in freq) {
      count += freq[i]
      if (count >= k) {
        return i
      }
    }
    i--
  }
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))