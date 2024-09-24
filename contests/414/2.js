/**
 * @param {number[]} start
 * @param {number} d
 * @return {number}
 */
var maxPossibleScore = function (start, d) {
  const arr = []
  for (let i = 0; i < start.length; i++) {
    arr.push([start[i], start[i] + d])
  }
  arr.sort((a, b) => a[0] - b[0])
  const n = arr.length

  const binary = (distance) => {
    let curMin = arr[0][0]
    for (let i = 1; i < n; i++) {
      if (curMin + distance > arr[i][1]) {
        return false
      }
      curMin = Math.max(curMin + distance, arr[i][0])
    }
    return true
  }
  let l = 0;
  let r = arr[n - 1][1] - arr[0][0]
  let result = 0;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (binary(mid)) {
      l = mid + 1
      result = mid
    } else {
      r = mid - 1
    }
  }
  return result
};
// console.log(maxPossibleScore([4, 4, 2, 7, 10], 5))
// console.log(maxPossibleScore([6, 0, 3], 2))
console.log(maxPossibleScore([1000000000, 0], 1000000000))