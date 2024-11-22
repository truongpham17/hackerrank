/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean}
 */
var isZeroArray = function (nums, queries) {
  const n = nums.length;
  const step = Array(n + 1).fill(0)
  for (const [start, end] of queries) {
    step[start]++
    step[end + 1]--
  }
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur += step[i]
    if (cur < nums[i]) return false
  }
  return true
};
console.log(isZeroArray([1, 0, 1], [[0, 2]]))
console.log(isZeroArray([4, 3, 2, 1], [[1, 3], [0, 2]]))