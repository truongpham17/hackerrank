/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxEqualRowsAfterFlips = function (matrix) {
  const map = new Map();
  const m = matrix.length;
  const n = matrix[0].length;
  let max = 1;
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 1) {
      // flip all to 0 
      for (let j = 0; j < n; j++) {
        matrix[i][j] ^= 1
      }
    }
    // to string
    const str = matrix[i].reduce((acc, cur) => acc + cur, '')
    if (!map.has(str)) {
      map.set(str, 1)
    } else {
      const value = map.get(str) + 1
      map.set(str, value)
      max = Math.max(max, value)
    }
  }
  return max
};
console.log(maxEqualRowsAfterFlips([[0, 1], [1, 1]]))
console.log(maxEqualRowsAfterFlips([
  [0, 0, 0],
  [0, 0, 1],
  [1, 1, 0]
]))