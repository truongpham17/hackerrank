/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumScore = function (nums) {
  let cur = nums[0]
  const arr = [0]
  for (let i = 1; i < nums.length - 1; i++) {
    if (nums[i] > cur) {
      arr.push(i)
      cur = nums[i]
    }
  }
  arr.push(nums.length - 1)
  let rs = 0;
  for (let i = 1; i < arr.length; i++) {
    rs += (arr[i] - arr[i - 1]) * (nums[arr[i - 1]])
  }
  return rs 

};