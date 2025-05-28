/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
  const n = coins.length;
  const m = coins[0].length;
  const getValue = (x, y) => {
    if (x === undefined && y === undefined) return 0;
    if (x === undefined) return y
    if (y === undefined) return x
    return Math.max(x, y)
  }

  const arr = Array.from({ length: n }, () => Array.from({ length: m }, () => [0, 0, 0]))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      arr[i][j][0] = coins[i][j] + getValue(arr[i]?.[j - 1]?.[0], arr[i - 1]?.[j]?.[0])
      // calculate the value
      // no need to calculate the other
      for (let k = 1; k < 3; k++) {
        arr[i][j][k] = coins[i][j] + getValue(arr[i]?.[j - 1]?.[k], arr[i - 1]?.[j]?.[k])
      }
      if (coins[i][j] < 0) {
        for (let k = 1; k < 3; k++) {
          arr[i][j][k] = Math.max(arr[i][j][k], getValue(arr[i]?.[j - 1]?.[k - 1], arr[i - 1]?.[j]?.[k - 1]))
        }
      }
    }
  }
  let rs = -(10 ** 10)
  for (let i = 0; i < 3; i++) {
    rs = Math.max(rs, arr[n - 1][m - 1][i])
  }
  return rs
};
console.log(maximumAmount([[-7, 12, 12, 13], [-6, 19, 19, -6], [9, -2, -10, 16], [-4, 14, -10, -9]]))