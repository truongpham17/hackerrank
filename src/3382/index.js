/**
 * @param {number[]} xCoord
 * @param {number[]} yCoord
 * @return {number}
 */
var maxRectangleArea = function (xCoord, yCoord) {
  const rows = {}
  const cols = {}
  for (let i = 0; i < xCoord.length; i++) {
    const x = xCoord[i]
    const y = yCoord[i]
    if (!cols[x]) {
      cols[x] = []
    }
    if (!rows[y]) {
      rows[y] = {}
    }
    rows[y][x] = -1
    cols[x].push(y)
  }

  const xVals = Object.keys(cols).sort((a, b) => b - a)

  for (const x of xVals) {
    cols[x].sort((a, b) => b - a)
  }

  for (const x of xVals) {
    const yVals = cols[x]
    for (let i = 0; i < yVals.length - 1; i++) {
      // move to lower y
      const lowerY = yVals[i + 1]
      // coord: x, lowerY
      rows[lowerY][x] = yVals[i]
    }
  }

  let max = -1

  const yVals = Object.keys(rows).sort((a, b) => b - a)

  for (let k = 1; k < yVals.length; k++) {
    const y = yVals[k]
    const xVals = Object.keys(rows[y]).sort((a, b) => a - b)
    for (let i = 0; i < xVals.length - 1; i++) {
      if (rows[y][xVals[i]] !== -1 && rows[y][xVals[i]] === rows[y][xVals[i + 1]]) {
        max = Math.max(max, Math.abs((rows[y][xVals[i]] - y) * (xVals[i + 1] - xVals[i])))
      }
    }
  }
  return max
};

function existsInRange(arr, minVal, maxVal) {
  if (!arr.length || minVal > maxVal) {
    return false;
  }

  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < minVal) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low < arr.length && arr[low] <= maxVal;
}

const inputs = [
  [[1, 1, 3, 3], [1, 3, 1, 3]],
  [[1, 1, 3, 3, 2], [1, 3, 1, 3, 2]],
  [[1, 1, 3, 3, 1, 3], [1, 3, 1, 3, 2, 2]]
]
for (const [a, b] of inputs) {
  console.log(maxRectangleArea(a, b))
}

/**
 * 
 * 
 * 
 * 
 */