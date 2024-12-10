/**
 * @param {number[]} xCoord
 * @param {number[]} yCoord
 * @return {number}
 */
var maxRectangleArea = function (xCoord, yCoord) {
  const col = new Map()
  const row = new Map();
  const point = new Map();
  const toKey = (x, y) => x * (10 ** 9) + y
  const setPoint = (x, y, value) => {
    point.set(toKey(x, y), value)
  }
  const getPoint = (x, y) => {
    return point.get(toKey(x, y))
  }
  for (let i = 0; i < xCoord.length; i++) {
    const x = xCoord[i]
    const y = yCoord[i]
    if (!col.has(y)) {
      col.set(y, [])
    }
    if (!row.has(x)) {
      row.set(x, [])
    }
    col.get(y).push(x)
    row.get(x).push(y)
    setPoint(x, y, -1)
  }
  for (const x of col.values()) {
    x.sort((a, b) => b - a)
  }

  for (const x of row.values()) {
    x.sort((a, b) => b - a)
  }


  let max = -1
  const keys = [...col.keys()].sort((a, b) => b - a)
  // from top to bottom
  for (const y of keys) {
    const sameYs = col.get(y)
    for (const x of sameYs) {
      // find lower, same x
      const sameXs = row.get(x)
      if (!sameXs?.length) continue;
      while (sameXs[sameXs.length - 1] >= y) {
        sameXs.pop()
      }
      if (!sameXs?.length) continue;
      const lowerY = sameXs[sameXs.length - 1]
      setPoint(x, lowerY, y)
      // 
      const nextNodes = col.get(lowerY)
      if (!nextNodes?.length) continue;
      let tempNode = nextNodes[nextNodes.length - 1]
      while (tempNode >= x) {
        nextNodes.pop();
        tempNode = nextNodes[nextNodes.length - 1]
      }
      if (tempNode) {
        // x 
        if (getPoint(tempNode, lowerY) === y) {
          max = Math.max(max, Math.abs(tempNode - x) * y)
        }
      }
    }
  }
  return max
  // find next node

};