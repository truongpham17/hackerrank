// source: https://leetcode.com/problems/k-radius-subarray-averages/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function (nums, k) {
  if (k === 0) return nums;
  if (k >= nums.length / 2) return new Array(nums.length).fill(-1);
  const rs = new Array(k).fill(-1);
  let leftSum = 0;
  let rightSum = 0;
  for (let i = 0; i < k; i++) {
    leftSum += nums[i];
  }
  for (let i = k + 1; i < 2 * k + 1; i++) {
    rightSum += nums[i];
  }
  for (let pivot = k; pivot < nums.length - k; pivot++) {
    rs.push(Math.floor((nums[pivot] + leftSum + rightSum) / (2 * k + 1)));
    leftSum = leftSum - nums[pivot - k] + nums[pivot];
    rightSum = rightSum - nums[pivot + 1] + nums[pivot + k + 1];
  }
  for (let i = 0; i < k; i++) {
    rs.push(-1);
  }
  return rs;
};
console.log(getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3));
