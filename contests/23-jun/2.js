/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumArea = function (grid) {
  const oneArr = [];
  for (const i in grid) {
    for (const j in grid[i]) {
      if (grid[i][j] === 1) {
        oneArr.push([Number(i), Number(j)])
      }
    }
  }
  let maxI = 0;
  let minI = 10 ** 10;
  let maxJ = 0;
  let minJ = 10 ** 10;
  for (const [i, j] of oneArr) {
    if (i > maxI) {
      maxI = i
    }
    if (i < minI) {
      minI = i
    }
    if (j > maxJ) {
      maxJ = j
    }
    if (j < minJ) {
      minJ = j
    }
  }
  return Math.abs((maxI - minI + 1) * (maxJ - minJ + 1))
};
minimumArea([[0, 1, 0], [1, 0, 1]])