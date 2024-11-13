/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const n = nums2.length
  const dp = Array(n).fill(-1)
  const indexMap = new Map();
  //[index, value]
  const stack = []
  for (let i = 0; i < nums2.length; i++) {
    const val = nums2[i]
    indexMap.set(val, i)
    while (stack.length > 0) {
      if (stack[stack.length - 1][1] < val) {
        dp[stack[stack.length - 1][0]] = val
        stack.pop();
      } else {
        break;
      }
    }
    stack.push([i, val])
  }
  const rs = []
  for (const num of nums1) {
    const index = indexMap.get(num)
    rs.push(dp[index])
  }
  return rs
};