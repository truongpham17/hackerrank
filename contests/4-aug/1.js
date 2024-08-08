/**
 * @param {number[][]} grid
 */

const toKey = (x, y) => {
  return x * 10000 + y
}
const toCoor = (x) => {
  return [(x - (x % 10000)) / 10000, x % 10000]
}

var neighborSum = function (grid) {
  this.arr = grid;
  const map = new Map()
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      map.set(grid[i][j], toKey(i, j))
    }
  }
  this.map = map
};

/** 
 * @param {number} value
 * @return {number}
 */
neighborSum.prototype.adjacentSum = function (value) {
  const [i, j] = toCoor(this.map.get(value))
  const coords = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1]
  ]
  return coords.reduce((sum, [i, j]) => sum + (i >= 0 && j >= 0 && i < this.arr.length && j < this.arr[0].length ? this.arr[i][j] : 0), 0)

};

/** 
 * @param {number} value
 * @return {number}
 */
neighborSum.prototype.diagonalSum = function (value) {
  const [i, j] = toCoor(this.map.get(value))
  const coords = [
    [i - 1, j - 1],
    [i + 1, j + 1],
    [i + 1, j - 1],
    [i - 1, j + 1]
  ]
  return coords.reduce((sum, [i, j]) => sum + (i >= 0 && j >= 0 && i < this.arr.length && j < this.arr[0].length ? this.arr[i][j] : 0), 0)
};

const a = new neighborSum([[0, 1, 2], [3, 4, 5], [6, 7, 8]])
console.log(a.adjacentSum(4))
/** 
 * Your neighborSum object will be instantiated and called as such:
 * var obj = new neighborSum(grid)
 * var param_1 = obj.adjacentSum(value)
 * var param_2 = obj.diagonalSum(value)
 */