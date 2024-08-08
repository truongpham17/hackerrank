/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFlips = function (grid) {
  let minFlip = 0
  for (const h of grid) {
    let l = 0;
    let r = h.length - 1
    while (l < r) {
      if (h[l] !== h[r]) {
        minFlip++
      }
      l++
      r--
    }
  }

  let vMinFlip = 0
  for (let i = 0; i < grid[0].length; i++) {
    let l = 0;
    let r = grid.length - 1
    while (l < r) {
      if (grid[l][i] !== grid[r][i]) {
        vMinFlip++
      }
      l++
      r--
    }
  }

  return Math.min(minFlip, vMinFlip)
};
console.log(minFlips([[0, 1], [0, 1], [0, 0]]))