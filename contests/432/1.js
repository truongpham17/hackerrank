/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var zigzagTraversal = function (grid) {
  // 0: right, 1: left
  let direction = 0;
  let count = 0;
  const pos = [0, 0]
  const rs = [grid[0][0]]
  const row = grid.length
  const col = grid[0].length
  const move = () => {
    // left
    if (direction === 0) {
      if (pos[1] + 1 < col) {
        pos[1] += 1
        return
      } else {
        pos[0] += 1
        direction = 1
      }
    } else {
      if (pos[1] > 0) {
        pos[1]--
        return
      } else {
        pos[0] += 1
        direction = 0
      }
    }
  }
  while (pos[0] < row) {
    move()
    count++
    if (pos[0] < row && count % 2 === 0) {
      rs.push(grid[pos[0]][pos[1]])
    }
  }
  return rs
};

console.log(zigzagTraversal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))