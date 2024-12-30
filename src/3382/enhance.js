/**
 * @param {number[]} xCoord
 * @param {number[]} yCoord
 * @return {number}
 */
var maxRectangleArea = function (xCoord, yCoord) {
  const cols = {}

  const toCoord = (x, y) => x * (10) + y

  const coords = []
  for (let i = 0; i < xCoord.length; i++) {
    const x = xCoord[i]
    const y = yCoord[i]
    if (!cols[x]) {
      cols[x] = []
    }

    cols[x].push([y, -1])
    coords.push(toCoord(x, y))
  }

  coords.sort((a, b) => a - b)

  const binarySearch = (value) => {
    let l = 0;
    let r = coords.length - 1;
    while (l <= r) {
      const mid = Math.round((l + r) / 2)
      if (coords[mid] === value) {
        return mid
      }
      if (coords[mid] < value) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    }
  }

  for (const key of Object.keys(cols)) {
    const ys = cols[key].sort((a, b) => a[0] - b[0])
    for (let i = 0; i < ys.length - 1; i++) {
      ys[i][1] = ys[i + 1][0]
    }
  }
  const rows = {}
  for (const x of Object.keys(cols)) {
    for (const [y, val] of cols[x]) {
      if (!rows[y]) {
        rows[y] = []
      }
      rows[y].push([Number(x), val])
    }
  }
  let rs = -1
  for (const key of Object.keys(rows).map(Number)) {
    const xs = rows[key].sort((a, b) => a[0] - b[0])
    for (let i = 0; i < xs.length - 1; i++) {
      if (xs[i][1] === xs[i + 1][1] && xs[i][1] !== -1) {
        const higherY = xs[i][1]
        const lowerY = key
        const lowerX = xs[i][0]
        const higherX = xs[i + 1][0]
        const D = [lowerX, lowerY]
        const C = [higherX, lowerY]
        const B = [higherX, higherY]
        const A = [lowerX, higherY]
        const f = ([a, b]) => {
          const coord = toCoord(a, b)
          return binarySearch(coord) + 1
        }
        const count = f(B) - f(C) - f(A) + 2 * f(D)
        console.log(A, B, C, D, f(A), f(B), f(C), f(D), count, coords)
        if (count === 0) {
          rs = Math.max(rs, Math.abs((higherY - lowerY) * (higherX - lowerX)))
        }
      }
    }
  }

  return rs
};
const inputs = [
  // [[1, 1, 3, 3], [1, 3, 1, 3]],
  [[1, 1, 3, 3, 2], [1, 3, 1, 3, 2]],
  // [[1, 1, 3, 3, 1, 3], [1, 3, 1, 3, 2, 2]]
]
for (const [a, b] of inputs) {
  console.log(maxRectangleArea(a, b))
}