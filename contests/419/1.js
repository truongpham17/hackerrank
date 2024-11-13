/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
  const n = nums.length
  const ans = []
  for (let i = 0; i < n - k + 1; i++) {
    const count = {}
    for (let j = i; j < i + k; j++) {
      if (count[nums[j]] === undefined) {
        count[nums[j]] = 0
      }
      count[nums[j]]++
    }
    // value, count
    const array = Object.keys(count).map(i => [Number(i), count[i]]).sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]).slice(-x)
    ans.push(array.reduce((a, b) => a + b[0] * b[1], 0))

  }
  return ans
};
console.log(findXSum([1, 1, 2, 2, 3, 4, 2, 3], 6, 2))