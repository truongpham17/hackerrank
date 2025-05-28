/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function (nums, k) {
  if (nums.length === 1) return nums[0];
  const map = new Map();
  for (const num of nums) {
    if (!map.has(num)) {
      map.set(num, 1)
    } else {
      map.set(num, map.get(num) + 1)
    }
  }
  let rs = -1
  if (k === 1) {
    for (const [key, value] of map.entries()) {
      if (value === 1) {
        rs = Math.max(rs, key)
      }
    }
    return rs
  }
  if (nums.length <= k) {
    return Math.max(...nums)
  }

  const st = nums[0]
  const en = nums[nums.length - 1]
  if (map.get(st) === 1) {
    rs = Math.max(rs, st)
  }
  if (map.get(en) === 1) {
    rs = Math.max(rs, en)
  }
  return rs
};
console.log(largestInteger([3, 1, 7, 10, 0], 1))