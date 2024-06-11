//https://leetcode.com/problems/continuous-subarray-sum/?envType=daily-question&envId=2024-06-10
// MEDIUM
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  const map = new Map();
  let temp = 0
  for (const num of nums) {
    temp = (temp + num) % k
    if (map.has(temp)) {
      map.set(temp, map.get(temp) + 1)
    } else {
      map.set(temp, 1)
    }
  }
  temp = 0;
  for (const value of nums) {
    if (map.has(temp)) {
      if (map.get(temp) > 1 || (value % k !== 0 && map.get(temp) > 0)) {
        return true
      }
    }
    temp = (temp + value) % k;
    map.set(temp, map.get(temp) - 1);
  }
  return false;
};
console.log(checkSubarraySum([23, 2, 6, 4, 7], 6))