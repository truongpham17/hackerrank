/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const table = new MaxSparseTable(height)
  let i = 0;
  let count = 0;
  while (i < height.length) {
    if (i + 1 < height.length && height[i + 1] < height[i]) {
      const maxPossibleHeight = Math.min(height[i], table.query(i + 1, height.length - 1))
      // checking here
      let j = i + 1
      while (height[j] < maxPossibleHeight) {
        count += maxPossibleHeight - height[j]
        j++
      }
      i = j
    } else {
      i++
    }
  }
  return count
};

class MaxSparseTable {
  constructor(array) {
    const logn = Math.ceil(Math.log2(array.length));
    const n = array.length
    const st = Array.from({ length: array.length }, () => Array(logn).fill(0));
    for (let i = 0; i < array.length; i++) {
      st[i][0] = array[i]
    }

    let j = 1;
    while ((1 << j) <= n) {
      let i = 0;
      while (i + (1 << j) <= n) {
        st[i][j] = Math.max(st[i][j - 1], st[i + (1 << (j - 1))][j - 1])
        i += 1
      }
      j += 1
    }
    this.st = st
  }

  query(left, right) {
    const k = Math.floor(Math.log2(right - left + 1))
    const x = right - (1 << k) + 1;
    return Math.max(this.st[left][k], this.st[x][k])
  }
}
console.log(trap([4, 2, 3]))