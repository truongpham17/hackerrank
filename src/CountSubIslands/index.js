// https://leetcode.com/problems/count-sub-islands/?envType=daily-question&envId=2024-08-28
// MEDIUM

/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */
var countSubIslands = function (grid1, grid2) {
  const getNearby = (x, y) => {
    return [[x - 1, y], [x, y - 1], [x + 1, y], [x, y + 1]].filter(([x, y]) => x >= 0 && x < grid2.length && y >= 0 && y < grid2[0].length && grid2[x][y] === 1)
  }

  let rs = 0;

  const dfs = (x, y) => {
    let notIncludeCount = 0;
    if (grid1[x][y] === 0) {
      notIncludeCount++
    }
    grid2[x][y] = 2
    const nearby = getNearby(x, y)
    for (const [a, b] of nearby) {
      notIncludeCount += dfs(a, b)
    }
    return notIncludeCount
  }

  for (let i = 0; i < grid2.length; i++) {
    for (let j = 0; j < grid2[0].length; j++) {
      if (grid2[i][j] === 1) {
        if (dfs(i, j) === 0) {
          rs++
        }
      }
    }
  }
  return rs

};

console.log(countSubIslands([
  [1, 1, 1, 1, 0, 0],
  [1, 1, 0, 1, 0, 0],
  [1, 0, 0, 1, 1, 1],
  [1, 1, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 0]],
  [
    [1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0]
  ]))