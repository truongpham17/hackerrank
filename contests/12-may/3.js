/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  const mul = grid[0].length;
  const toCoord = (x, y) => x * mul + y;
  // store own value, store maxRef value
  const map = new Map()
  map.set(toCoord(grid.length - 1, grid[0].length - 1), {
    maxRef: 0,
    value: 0
  })
  let max = 0;
  let maxOneMove = -(10 ** 10)
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = grid[0].length - 1; j >= 0; j--) {
      let maxCurValue = 0
      let maxRefValue = 0
      if (i + 1 < grid.length) {
        const refObj = map.get(toCoord(i + 1, j))
        maxCurValue = Math.max(maxCurValue, refObj.value + grid[i + 1][j] - grid[i][j])
        maxRefValue = Math.max(maxCurValue, refObj.maxRef)
        maxOneMove = Math.max(maxOneMove, grid[i + 1][j] - grid[i][j])
      }
      if (j + 1 < grid[0].length) {
        const refObj = map.get(toCoord(i, j + 1))
        maxCurValue = Math.max(maxCurValue, refObj.value + grid[i][j + 1] - grid[i][j])
        maxRefValue = Math.max(maxCurValue, refObj.maxRef)
        maxOneMove = Math.max(maxOneMove, grid[i][j + 1] - grid[i][j])
      }
      map.set(toCoord(i, j), {
        maxRef: maxRefValue,
        value: maxCurValue
      })
      max = Math.max(max, maxCurValue, maxRefValue)
    }
  }
  return max === 0 ? maxOneMove : max
};

console.log(maxScore([[4, 3, 2], [3, 2, 1]]))