/**
 * @param {number[][]} nums
 * @return {number}
 */
var numberOfPoints = function (nums) {
  // 0 .. 101
  const arr = new Array(102).fill(0)
  for (const [start, end] of nums) {
    arr[start]++
    arr[end + 1]--
  }
  let count = 0;
  let rs = 0
  for (let i = 1; i <= 100; i++) {
    count += arr[i]
    if (count > 0) {
      rs++
    }
  }
  return rs
};