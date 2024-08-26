// https://leetcode.com/problems/spiral-matrix-iii/
// MEDIUM
/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function (rows, cols, rStart, cStart) {
  const DIRECTION = {
    0: [0, 1], // right
    1: [1, 0], // down 
    2: [0, -1], // left 
    3: [-1, 0] // up 
  }
  let curDirection = 0
  const result = [[rStart, cStart]]
  let x = rStart
  let y = cStart
  const isValid = (i, j) => i < rows && i >= 0 && j < cols && j >= 0
  let step = 1;
  while (result.length < rows * cols) {
    for (let i = 0; i < 2; i++) {
      for (let j = 1; j <= step; j++) {
        x += DIRECTION[curDirection][0]
        y += DIRECTION[curDirection][1]
        if (isValid(x, y)) {
          result.push([x, y])
        }
      }
      curDirection = (curDirection + 1) % 4
    }
    step++
  }
  return result
};
console.log(spiralMatrixIII(1, 4, 0, 0))