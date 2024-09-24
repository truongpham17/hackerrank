/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  const toId = (x, y) => x * 10000 + y
  const map = new Map()

  for (let i = 0; i < grid.length; i++) {
    const set = new Set()
    let decrease = 0
    for (let j = 0; j < grid[i].length; j++) {
      if (set.has(grid[i][j])) {
        grid[i][j] = decrease
        decrease--
      }
      map.set(toId(i, grid[i][j]), j)
      set.add(grid[i][j])
    }
  }
  // -1 and the end
  for (const row of grid) {
    row.sort((a, b) => b - a)
  }

  let rs = -1


  const travel = (row, col, arr) => {
    if (row >= grid.length || col >= grid[0].length) {
      rs = arr.reduce((a, b) => a + Math.max(b, 0), 0)
      return rs
    }

    const gridValue = grid[row][col]

    const duplicateRowIndex = arr.findIndex(v => v === gridValue)
    if (duplicateRowIndex !== -1) {
      const duplicateColIndex = grid[duplicateRowIndex].findIndex(i => i === gridValue)
      let value = -1
      if (col + 1 >= grid[0].length) {
        value = Math.max(value, travel(row + 1, 0, arr))
      } else {
        value = Math.max(value, travel(row, col + 1, arr))
      }

      value = Math.max(value, travel(duplicateRowIndex, duplicateColIndex + 1,
        arr.slice(0, duplicateRowIndex)
      ))
      rs = Math.max(value, rs)
      return value
    } else {
      arr.push(gridValue)
      const value = travel(row + 1, 0, arr)
      rs = Math.max(rs, value)
      return value
    }
  }

  travel(0, 0, [])
  return rs
};
console.log(maxScore([[16, 18], [20, 20], [18, 18], [1, 15]]))