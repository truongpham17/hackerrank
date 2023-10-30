// source: https://leetcode.com/problems/number-of-increasing-paths-in-a-grid/
/**
 * @param {number[][]} grid
 * @return {number}
 */
const MOD = 1000000007;
const DIRECTION = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
var countPaths = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const array = new Array(m);

  for (let i = 0; i < m; i++) {
    array[i] = new Array(n).fill(undefined);
  }

  let total = 0;

  function getValue(i, j) {
    let value = 1;
    for (let d = 0; d < DIRECTION.length; d++) {
      const ii = i + DIRECTION[d][0];
      const jj = j + DIRECTION[d][1];
      if (grid[ii]?.[jj] < grid[i][j]) {
        if (array[ii][jj] === undefined) {
          array[ii][jj] = getValue(ii, jj);
        }
        value = array[ii][jj] + value;
      }
    }
    return value % MOD;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (array[i][j] !== undefined) {
        total += array[i][j];
        continue;
      }
      array[i][j] = getValue(i, j);
      total += array[i][j];
    }
  }
  return total % MOD;
};
countPaths([
  [1, 1],
  [3, 4],
]);
