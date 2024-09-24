/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  const valueSet = new Set()
  const rowKey = new Map();
  const allValues = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const v = grid[i][j]
      valueSet.add(v)

      if (!rowKey.has(v)) {
        rowKey.set(v, [])
      }
      rowKey.get(v).push(i)
    }
  }

  for (const v of valueSet.keys()) {
    allValues.push(v)
  }

  allValues.sort((a, b) => b - a)

  let rs = 0;

  const travel = (index, mask, curResult) => {
    if (index >= allValues.length) return curResult;

    const value = allValues[index]

    let find = false
    for (const row of rowKey.get(value)) {
      // not yet selected
      if (!(mask & (1 << row))) {
        find = true
        // select this value and mask it
        rs = Math.max(rs, curResult + value)
        travel(index + 1, mask | (1 << row), curResult + value)
      }
    }
    // not select this one
    if (!find) {
      travel(index + 1, mask, curResult)
    }
  }

  travel(0, 0, 0)
  return rs

};

console.log(maxScore([[92, 11, 45, 88, 38, 13, 65, 85], [52, 83, 3, 14, 82, 51, 27, 59], [65, 69, 99, 27, 7, 70, 39, 43], [43, 46, 22, 19, 75, 70, 57, 50], [54, 36, 91, 80, 74, 43, 62, 61], [35, 45, 19, 32, 92, 50, 93, 88], [60, 15, 93, 10, 89, 32, 51, 11], [82, 66, 42, 61, 78, 94, 66, 7], [75, 56, 49, 78, 81, 61, 79, 50]]))