/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function (grid, k) {
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  // Compute the prefix sum
  const prefixSum = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      prefixSum[i][j] = grid[i - 1][j - 1] + prefixSum[i - 1][j] + prefixSum[i][j - 1] - prefixSum[i - 1][j - 1];
    }
  }

  // Helper function to get the sum of submatrix with top-left corner at (x1, y1) and bottom-right corner at (x2, y2)
  const getSubmatrixSum = (x1, y1) => {
    return prefixSum[x1 + 1][y1 + 1] - prefixSum[0][y1 + 1] - prefixSum[x1 + 1][0] + prefixSum[0][0];
  };

  // Iterate through all possible submatrices
  for (let x1 = 0; x1 < m; x1++) {
    for (let y1 = 0; y1 < n; y1++) {
      const sum = getSubmatrixSum(x1, y1);
      if (sum <= k) {
        count++;
      }
    }
  }
  return count;
}

console.info(countSubmatrices([[7, 2, 9], [1, 5, 0], [2, 6, 6]]
  , 20))