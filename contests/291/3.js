/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} p
 * @return {number}
 */
var countDistinct = function (nums, k, p) {
  const check = (a, b) => {
    for (let j = 0; j < a; j++) {
      for (let i = 0; i <= b - a; i++) {
        if (nums[i + j] !== nums[i + a]) {
          break
        }
        if (i === b - a) {
          return true
        }
      }
    }
    return false
  }
  let rs = 0;
  for (let i = 0; i < nums.length; i++) {
    let count = 0
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % p === 0) {
        count++
      }
      if (count > k) {
        break
      }
      if (!check(i, j)) {
        rs++
      }

    }
  }
  return rs
};