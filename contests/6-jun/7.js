/**
 * @param {character[][]} grid
 * @return {number}
 */
var numberOfSubmatrices = function (grid) {
  const X = []
  const Y = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'X') {
        X.push([i, j])
      } else if (grid[i][j] === 'Y') {
        Y.push([i, j])
      }
    }
  }

  const r = grid.length;
  const c = grid[0].length;
  let dpXY = Array.from({ length: c }, () => [0, 0])
  Array.from({ length: r }, () => Array.from({ length: c }, () => [0, 0]))//X and Y
  const dp = Array.from({ length: r }, () => Array.from({ length: c }, () => [0, 0]))//X and Y
  const findXY = (row, col) => {
    if (col === 0) {
      if (grid[row][col] === 'X') {
        dpXY[row][col][0] = 1
      } else if (grid[row][col] === 'Y') {
        dpXY[row][col][1] = 1
      }
    } else {
      dpXY[row][col] = [...dpXY[row][col - 1]]
      if (grid[row][col] === 'X') {
        dpXY[row][col][0]++
      } else if (grid[row][col] === 'Y') {
        dpXY[row][col][1]++
      }
    }

    return dpXY[row][col]
  }

  let result = 0;
  for (let j = 0; j < c; j++) {
    if (j > 0) {
      dp[0][j] = [...dp[0][j - 1]]
    }
    if (grid[0][j] === 'X') {
      if (j > 0) {
        dp[0][j][0] = dp[0][j - 1][0] + 1
      } else {
        dp[0][j][0] = 1
      }
    }
    if (grid[0][j] === 'Y') {
      if (j > 0) {
        dp[0][j][1] = dp[0][j - 1][1] + 1
      } else {
        dp[0][j][1] = 1
      }
    }

    if (dp[0][j][1] === dp[0][j][0] && dp[0][j][0] > 0) {
      result++
    }

    for (let i = 1; i < r; i++) {
      const [x, y] = findXY(i, j)
      dp[i][j][0] = dp[i - 1][j][0] + x
      dp[i][j][1] = dp[i - 1][j][1] + y
      if (dp[i][j][1] === dp[i][j][0] && dp[i][j][0] > 0) {
        result++
      }
    }
  }
  return result
};
console.log(numberOfSubmatrices([[".", "."], ["Y", "X"]]))