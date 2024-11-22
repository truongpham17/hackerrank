/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
  // 0: is not protected, 1: protected, 2: guard, 3: wall
  const grid = Array.from({ length: m }, () => Array(n).fill(0))
  for (const [x, y] of guards) {
    grid[x][y] = 2
  }
  for (const [x, y] of walls) {
    grid[x][y] = 3
  }
  // loops for times
  for (let i = 0; i < m; i++) {
    let isProtect = false
    for (let j = 0; j < n; j++) {
      if (isProtect && grid[i][j] === 0) {
        grid[i][j] = 1
      }
      if (grid[i][j] === 2) {
        isProtect = true
      }
      if (grid[i][j] === 3) {
        isProtect = false
      }
    }
  }

  for (let i = 0; i < m; i++) {
    let isProtect = false
    for (let j = n - 1; j >= 0; j--) {
      if (isProtect && grid[i][j] === 0) {
        grid[i][j] = 1
      }
      if (grid[i][j] === 2) {
        isProtect = true
      }
      if (grid[i][j] === 3) {
        isProtect = false
      }
    }
  }
  for (let j = 0; j < n; j++) {
    let isProtect = false
    for (let i = 0; i < m; i++) {
      if (isProtect && grid[i][j] === 0) {
        grid[i][j] = 1
      }
      if (grid[i][j] === 2) {
        isProtect = true
      }
      if (grid[i][j] === 3) {
        isProtect = false
      }
    }
  }
  for (let j = 0; j < n; j++) {
    let isProtect = false
    for (let i = m - 1; i >= 0; i--) {
      if (isProtect && grid[i][j] === 0) {
        grid[i][j] = 1
      }
      if (grid[i][j] === 2) {
        isProtect = true
      }
      if (grid[i][j] === 3) {
        isProtect = false
      }
    }
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        count++
      }
    }
  }
  return count
};
console.log(countUnguarded(4, 6, [[0, 0], [1, 1], [2, 3]], [[0, 1], [2, 2], [1, 4]]))