// https://leetcode.com/problems/subarray-sums-divisible-by-k/?envType=daily-question&envId=2024-06-10
// MEDIUM
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 1 <= nums.length <= 3 * 104
 * k<=10**4
 * 1 2 3 = 1,2 1,2,3 None
 */
var subarraysDivByK = function (nums, k) {
  const map = new Map();
  let temp = 0;
  for (const value of nums) {
    temp = (temp + value) % k
    if (temp < 0) {
      temp += k
    }
    if (map.has(temp)) {
      map.set(temp, map.get(temp) + 1)
    } else {
      map.set(temp, 1)
    }
  }

  temp = 0;
  let result = 0;
  let sum = 0;
  for (const index in nums) {
    sum = (sum + nums[index]) % k
    if (sum < 0) {
      sum += k
    }
    const count = map.get(temp) || 0;
    result += count;
    map.set(sum, map.get(sum) - 1);
    temp = sum
  }
  return result
};
console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5))
