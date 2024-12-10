/**
 * @param {number[][]} points
 * @return {number}
 */
var maxRectangleArea = function (points) {

  const findNext = (set, index) => {
    for (let i = index + 1; i < points.length; i++) {
      const [a, b] = points[i]
      if (!set.has(a * 1000 + b)) {
        set.add(a * 1000 + b)
        if (set.size === 4) {
          // check here
          check(set)
        } else {
          findNext(set, i)
        }
        set.delete(a * 1000 + b)
      }
    }

  }

  let max = -1;

  const check = (set) => {
    const arr = []
    for (const key of set.keys()) {
      const x = Math.floor(key / 1000)
      const y = key % 1000
      arr.push([x, y])
    }
    arr.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
    const [a, b, c, d] = arr
    if (a[0] === b[0] && a[1] === c[1] && c[0] === d[0] && b[1] === d[1]) {
      let findBreak = false;
      for (const [x, y] of points) {
        if (!set.has(x * 1000 + y)) {
          if ((x <= c[0] && x >= a[0] && y <= d[1] && y >= c[1])) {
            findBreak = true;
            break
          }
        }
      }
      if (!findBreak) {
        max = Math.max(max, Math.abs((d[1] - c[1]) * (c[0] - a[0])))
      }
    }
  }
  findNext(new Set(), -1)
  return max
};
// console.log(maxRectangleArea([[1, 1], [1, 3], [3, 1], [3, 3], [2, 2]]))
// console.log(maxRectangleArea([[1, 1], [1, 3], [3, 1], [3, 3]]))
console.log(maxRectangleArea([[1, 1], [1, 3], [3, 1], [3, 3], [1, 2], [3, 2]]))