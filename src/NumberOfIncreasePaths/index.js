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
  const store = [];
  for (let i = 0; i < m; i++) {
    array[i] = new Array(n).fill(1);
    for (let j = 0; j < n; j++) {
      store.push({ i, j });
    }
  }

  function sort(start, end) {
    if (start >= end) return;
    const pivotVal = grid[store[end].i][store[end].j];
    let smallerIndex = start - 1;
    for (let i = start; i < end; i++) {
      if (grid[store[i].i][store[i].j] < pivotVal) {
        smallerIndex++;
        [store[smallerIndex], store[i]] = [store[i], store[smallerIndex]];
      }
    }
    smallerIndex++;
    [store[smallerIndex], store[end]] = [store[end], store[smallerIndex]];
    sort(start, smallerIndex - 1);
    sort(smallerIndex + 1, end);
  }

  sort(0, store.length - 1);

  let total = 0;

  store.forEach(({ i, j }) => {
    const val = grid[i][j];
    for (let d = 0; d < DIRECTION.length; d++) {
      const ii = i + DIRECTION[d][0];
      const jj = j + DIRECTION[d][1];
      if (grid[ii] !== undefined && grid[ii][jj] > val) {
        array[ii][jj] = (array[ii][jj] + array[i][j]) % MOD;
      }
    }
    total = (total + array[i][j]) % MOD;
  });

  return total % MOD;
};
countPaths([
  [1, 1],
  [3, 4],
]);
