/**
 * @param {number[][]} grid
 * @return {number}
 */
var lenOfVDiagonal = function (grid) {
  const DIRECTION = [[-1, -1], [-1, 1], [1, 1], [1, -1]]
  const n = grid.length;
  const m = grid[0].length;
  const getTurn = (d,) => {
    switch (d) {
      case 0: return [1];
      case 1: return [2];
      case 2: return [3];
      case 3: return [0]
    }
  }
  const toId = (x, y, d, t) => t * (10 ** 6) + d * (10 ** 5) + y * (10 ** 3) + x
  const isValid = (x, y) => x >= 0 && y >= 0 && x < n && y < m
  const map = new Map();

  const calPoint = (x, y, d, turn, prevValue) => {
    if (!isValid(x, y)) return 0;
    if (prevValue === 2) {
      if (grid[x][y] !== 0) return 0
    } else if (prevValue === 0) {
      if (grid[x][y] !== 2) return 0
    } else if (prevValue === 1) {
      if (grid[x][y] !== 2) return 0
    }

    const id = toId(x, y, d, turn);

    if (map.has(id)) {
      return map.get(id)
    }

    let length = 1

    if (turn === 0) {
      length += Math.max(
        calPoint(x + DIRECTION[d][0], y + DIRECTION[d][1], d, 0, grid[x][y]),
        ...getTurn(d).map(
          d => calPoint(x + DIRECTION[d][0], y + DIRECTION[d][1], d, 1, grid[x][y])
        )
      )
    } else {
      length += calPoint(x + DIRECTION[d][0], y + DIRECTION[d][1], d, 1, grid[x][y])
    }

    map.set(id, length)
    return length
  }

  let max = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        for (let d = 0; d <= 3; d++) {
          max = Math.max(max, calPoint(i, j, d, 0, -1))
        }
      }
    }
  }
  return max
};
console.log(lenOfVDiagonal(
  [[1, 1, 1, 2, 0, 0], [0, 0, 0, 0, 1, 2]]))