/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var sortMatrix = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const getDiagon = (x, y) => {
    const rs = [[x, y]]
    while (x + 1 < n && y + 1 < m) {
      rs.push([x + 1, y + 1])
      x++
      y++
    }
    return rs
  }
  const update = (value, diagons) => {
    let cur = 0;
    for (const [x, y] of diagons) {
      grid[x][y] = value[cur]
      cur++
    }
  }
  for (let j = 1; j < m; j++) {
    const diagons = getDiagon(0, j)
    const values = diagons.map(([x, y]) => grid[x][y])
    values.sort((a, b) => a - b)
    update(values, diagons)
  }
  for (let i = 0; i < n; i++) {
    const diagons = getDiagon(i, 0)
    const values = diagons.map(([x, y]) => grid[x][y])
    values.sort((a, b) => b - a)
    update(values, diagons)
  }
  return grid;
};
console.log(sortMatrix([[1, 7, 3], [9, 8, 2], [4, 5, 6]]))