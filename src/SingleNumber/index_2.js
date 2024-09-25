// 137 MEDIUM
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const bitCount = Array(32).fill(0)
  for (const num of nums) {
    for (let i = 0; i < 32; i++) {
      if (num & (1 << i)) {
        bitCount[i]++
        bitCount[i] %= 3
      }
    }
  }
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    if (bitCount[i]) {
      ans += (1 << i)
    }
  }
  return ans
};