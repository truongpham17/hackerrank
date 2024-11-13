/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  const findLeftPivot = (value) => {
    let l = 0
    let r = n - 1
    let rs = -1
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      if (nums[mid] >= value) {
        rs = mid
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    return rs
  }
  const findRightPivot = (value) => {
    let l = 0
    let r = n - 1
    let rs = -1
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      if (nums[mid] <= value) {
        rs = mid
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
    return rs
  }
  let rs = 0;

  for (const num of nums) {
    const minRange = lower - num
    const highRange = upper - num
    const left = findLeftPivot(minRange)
    const right = findRightPivot(highRange)
    if (left === -1 || right === -1) continue
    let count = right - left + 1
    if (num >= minRange && num <= highRange) {
      count--
    }
    rs += count
  }
  return rs / 2

};

console.log(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6))