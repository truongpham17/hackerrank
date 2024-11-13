/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSquareStreak = function (nums) {
  let MAX = 1
  const arr = new Array()
  for (const num of nums) {
    arr[num] = true
    MAX = Math.max(num)
  }
  let max = 1;
  for (let i = 2; i <= MAX; i++) {
    if (arr[i]) {
      let temp = i
      let find = 0
      while (arr[temp]) {
        find++
        temp *= temp
      }
      if (find > max) {
        max = find
      }
    }
  }
  return max === 1 ? -1 : max
};

console.log(longestSquareStreak([2, 3, 5, 6, 7]))