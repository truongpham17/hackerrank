// https://leetcode.com/problems/first-missing-positive/?envType=daily-question&envId=2024-06-13
// HARD

const MOD = 2 ** 32

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  const n = nums.length;
  nums.push(n + 1);
  for (let i = 0; i < n; i++) {
    const index = nums[i] % MOD;
    if (index > 0 && index <= nums.length) {

      // can be negative so need to * 2
      nums[index] = nums[index] + 2 * MOD; // mark that index exist!
    }
  }
  for (let i = 1; i <= n; i++) {
    if (nums[i] < MOD) {
      return i
    }
  }
  return n + 1;
};