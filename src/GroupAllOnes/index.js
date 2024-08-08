// https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together-ii/description/?envType=daily-question&envId=2024-08-02
// MEDIUM
/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
  let oneCount = nums.reduce((sum, cur) => sum + cur, 0);
  let tempOneCount = 0;
  for (let i = 0; i < oneCount; i++) {
    tempOneCount += nums[i]
  }
  let minSwap = 10 ** 10
  for (let i = 1; i <= nums.length; i++) {
    if (oneCount - tempOneCount < minSwap) {
      minSwap = oneCount - tempOneCount
    }
    tempOneCount -= nums[(i - 1) % (nums.length)]
    tempOneCount += nums[(i + oneCount - 1) % (nums.length)]
  }
  return minSwap
};
// EASY PEASY :D