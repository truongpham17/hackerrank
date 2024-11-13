/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  let dp = Array(n).fill(0)

  const DIRECTION = [-1, 0, 1]
  let max = 0
  // cur columns
  for (let j = 1; j < m; j++) {
    let found = false
    const nextDp = Array(n)
    for (let i = 0; i < n; i++) {
      let maxValue = -1;
      for (const x of DIRECTION) {
        if (i + x >= 0 && i + x < n && dp[i + x] !== -1) {
          // accepted
          if (grid[i][j] > grid[i + x][j - 1]) {
            found = true
            maxValue = Math.max(maxValue, dp[i + x] + 1)
          }
        }
      }
      nextDp[i] = maxValue
      max = Math.max(max, maxValue)
    }
    if (!found) return max
    dp = nextDp
  }
  return max
};
// console.log(maxMoves(
//   [[2, 4, 3, 5], [5, 4, 9, 3], [3, 4, 2, 11], [10, 9, 13, 15]]
// ))
// console.log(
//   maxMoves(
//     [[3, 2, 4], [2, 1, 9], [1, 1, 7]]
//   )
// )
console.log(maxMoves(
  [
    [187, 167, 209, 251, 152, 236, 263, 128, 135],
    [267, 249, 251, 285, 73, 204, 70, 207, 74],
    [189, 159, 235, 66, 84, 89, 153, 111, 189],
    [120, 81, 210, 7, 2, 231, 92, 128, 218],
    [193, 131, 244, 293, 284, 175, 226, 205, 245]
  ]
))