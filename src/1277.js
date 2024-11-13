/**
 * @param {number[][]} matrix
 * @return {number}
 */
var countSquares = function (matrix) {
  const row = matrix.length
  const col = matrix[0].length

  const findBiggestSquare = (x, y) => {
    let i = 1;
    while (x + i < row && y + i < col) {
      // x = x +i, y = y -> y+i
      for (let j = 0; j <= i; j++) {
        if (!matrix[x + i][y + j]) {
          return i
        }
      }
      for (let j = 0; j <= i; j++) {
        if (!matrix[x + j][y + i]) {
          return i
        }
      }
      i++
    }
    return i;
  }
  let rs = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matrix[i][j]) {
        const maxSquare = findBiggestSquare(i, j)
        rs += maxSquare
      }
    }
  }
  return rs
};

console.log(countSquares([
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1],
  [0, 1, 0, 1, 1],
  [1, 0, 0, 1, 1]
]))
// 0 -> 1
// 1-> 