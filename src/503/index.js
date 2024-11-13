/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  const n = nums.length;
  const dp = Array(n).fill(-1)
  // index, value 
  const stack = []
  for (let count = 0; count < 2; count++) {
    for (let i = 0; i < nums.length; i++) {
      while (stack.length) {
        const lastEl = stack[stack.length - 1]
        if (nums[i] > lastEl[1]) {
          dp[lastEl[0]] = nums[i]
          stack.pop()
        } else {
          break
        }
      }
      stack.push([i, nums[i]])
    }
  }
  return dp
};
console.log(nextGreaterElements([1, 2, 3, 4, 3]))