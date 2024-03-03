/**
 * @param {number[]} nums
 * @return {number[]}
 */
var resultArray = function (nums) {
  const num1 = [nums[0]]
  const num2 = [nums[1]]
  for (let i = 2; i < nums.length; i++) {
    if (num1[num1.length - 1] > num2[num2.length - 1]) {
      num1.push(nums[i])
    } else {
      num2.push(nums[i])
    }
  }
  return [...num1, ...num2]
};