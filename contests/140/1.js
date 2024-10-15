/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function (nums) {
  let min = 10 ** 10
  for (const num of nums) {
    const str = num.toString();
    let count = 0
    for (const c of str) {
      count += Number(c)
    }
    min = Math.min(count, min)
  }
  return min
};