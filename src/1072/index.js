/**
 * @param {number[][]} matrix
 * @return {number}
 */
var maxEqualRowsAfterFlips = function (matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let max = 0;
  const count = (flip) => {
    // counting
    let goodCount = 0;
    for (let i = 0; i < m; i++) {
      let isGood = true
      for (let j = 1; j < n; j++) {
        if ((matrix[i][j] ^ flip[j]) !== (matrix[i][j - 1] ^ flip[j - 1])) {
          isGood = false
          break
        }
      }
      if (isGood) {
        goodCount++
      }
    }
    return goodCount
  }

  for (let i = 0; i < m; i++) {
    max = Math.max(count(matrix[i]), max)
  }
  return max
};
console.log(maxEqualRowsAfterFlips([[0, 1], [1, 1]]))
console.log(maxEqualRowsAfterFlips([
  [0, 0, 0],
  [0, 0, 1],
  [1, 1, 0]
]))