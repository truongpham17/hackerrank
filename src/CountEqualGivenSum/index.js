// source: https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var numSubseq = function (nums, target) {
  const arr = new Array(nums.length).fill(0);
  if (nums[0] * 2 <= target) {
    arr[0] = 1;
  }
  for (let i = 1; i < nums.length; i++) {
    let less = 0;
    for (let j = 0; j <= i; j++) {
      if (arr[i] + arr[j] <= target) {
        less++;
      }
    }
    arr[i] = (arr[i - 1] + less) % 1000000007;
  }
  return arr[nums.length - 1];
};

console.log(numSubseq([2, 3, 3, 4, 6, 7], 12));
