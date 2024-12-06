/**
 * @param {character[][]} box
 * @return {character[][]}
 */
var rotateTheBox = function (box) {
  const m = box.length;
  const n = box[0].length
  const findFree = (row, index) => {
    while (box[row][index] === '*' && index > 0) {
      index--
    }
    return index
  }
  
  for (let i = 0; i < m; i++) {
    let col = n - 1
    for (let j = n - 1; j >= 0; j--) {
      if (box[i][j] === '*') {
        col = j - 1
      } else if (box[i][j] === '#') {
        col = findFree(i, col)
        const temp = box[i][j]
        box[i][j] = box[i][col]
        box[i][col] = temp
        col--
      }
    }
  }
  const rs = Array.from({ length: n }, () => Array(m))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      rs[j][m - 1 - i] = box[i][j]
    }
  }
  return rs
};
console.log(rotateTheBox([
  ["#", "#", "*", ".", "*", "."],
  ["#", "#", "#", "*", ".", "."],
  ["#", "#", "#", ".", "#", "."

  ]]))