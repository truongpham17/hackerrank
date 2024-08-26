// https://leetcode.com/problems/number-of-islands/description/
// MEDIUM
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;
  const check = new Set()
  const toId = (i, j) => i * 500 + j
  const dfs = (i, j) => {
    check.add(toId(i, j))
    const checks = [[i + 1, j], [i, j + 1], [i, j - 1], [i - 1, j]]
    for (const [x, y] of checks) {
      if (check.has(toId(x, y))) continue
      if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
        if (grid[x][y] === '1') {
          dfs(x, y)
        }
      }
    }
  }
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '0') continue
      if (check.has(toId(i, j))) continue
      count++
      dfs(i, j)
    }
  }
  return count
};
console.log(numIslands(
  [
    ["1", "0", "1", "1", "1"],
    ["1", "0", "1", "0", "1"],
    ["1", "1", "1", "0", "1"]
  ]))
