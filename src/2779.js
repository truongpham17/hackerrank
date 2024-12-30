/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function (nums, k) {
  nums.sort((a, b) => a - b)
  let max = 0;
  let min = 0;
  for (const x of nums) {
    max = Math.max(max, x)
    min = Math.min(min, x)
  }

  const line = Array(max + 1).fill(0)
  for (const x of nums) {
    max = Math.max(max, x)
    min = Math.min(min, x)
    line[x]++
  }
  
  const count = Array(max + 1).fill(0)

  let temp = 0;
  for (let i = min; i <= max; i++) {
    temp += line[i]
    count[i] += temp
  }

  let rs = 0;
  for (let i = min - k; i <= max - k; i++) {
    // count from i to i+2*k
    rs = Math.max(rs, count[Math.min(i + 2 * k, max)] - (count[i - 1] || 0))
  }
  return rs
};
console.log(maximumBeauty([1, 1, 1, 3], 10))
console.log(maximumBeauty([4, 6, 1, 2], 2))