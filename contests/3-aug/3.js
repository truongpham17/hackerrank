/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFlips = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const INF = 10 ** 6
  let count = 0;
  let oneDoubleCount = 0
  let mixedCount = 0
  for (let i = 0; i < n / 2; i++) {
    for (let j = 0; j < m / 2; j++) {
      const ii = n - 1 - i
      const jj = m - 1 - j
      let oneCount = 0;
      let zeroCount = 0;
      const a = new Set([[i, j], [ii, j], [i, jj], [ii, jj]].map(([i, j]) => i * INF + j))
      for (const x of a.keys()) {
        const j = x % INF
        const i = (x - x % INF) / INF
        if (grid[i][j] === 1) {
          oneCount++
        } else {
          zeroCount++
        }
      }
      if (a.size === 2 && oneCount === 2) {
        oneDoubleCount++
      }
      if (a.size === 2 && oneCount === 1) {
        mixedCount++
      }
      count += Math.min(oneCount, zeroCount)
    }
  }
  if (n % 2 === 1 & m % 2 === 1) {
    if (grid[n >> 1][m >> 1] === 1) {
      count++
    }
  }
  if (oneDoubleCount % 2 === 1) {
    if (mixedCount === 0) {
      count += 2
    }
  }

  return count
};
console.log(minFlips([[1], [1], [1], [0]]))