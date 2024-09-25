// 260 MEDIUM
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const xor = nums.reduce((acc, cur) => acc ^ cur, 0)
  const rs = [0, 0]
  const rightmostSetBit = xor & (-xor)
  for (const num of nums) {
    if (num & rightmostSetBit) {
      rs[0] ^= num
    } else {
      rs[1] ^= num
    }
  }
  return rs
};