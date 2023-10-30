// source: https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // use map: s[1] = 2
  const store = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (store.has(target - nums[i])) {
      return [store.get(target - nums[i]), i];
    }
    store.set(nums[i], i);
  }
};
