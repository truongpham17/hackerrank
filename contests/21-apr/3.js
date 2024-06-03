/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  const n = grid[0].length;
  const m = grid.length
  const diff = (index, value) => {
    let count = m;
    for (let i = 0; i < m; i++) {
      if (grid[i][index] === value) {
        count--;
      }
    }
    return count;
  }
  // 0..11
  let prevDp = []
  let curDp = []
  for (let i = 0; i < 12; i++) {
    prevDp.push(diff(0, i))
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 12; j++) {
      let curDiff = diff(i, j)
      let min = 10 ** 10
      for (let jj = 0; jj < 12; jj++) {
        if (jj === j) continue;
        min = Math.min(min, prevDp[jj])
      }
      curDp.push(min + curDiff)
    }
    prevDp = [...curDp]
    curDp = []
  }
  return Math.min(...prevDp)
};

console.log(minimumOperations([[1],[2],[3]]))