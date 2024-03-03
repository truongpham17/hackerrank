/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperationsToWriteY = function (grid) {
  const outSideY = { 0: 0, 1: 0, 2: 0 }
  const insideY = { 0: 0, 1: 0, 2: 0 }
  const n = grid[0].length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      outSideY[grid[i][j]]++
    }
  }
  const middle = Math.floor(n / 2)
  // top left to middle
  for (let i = 0; i <= middle; i++) {
    insideY[grid[i][i]]++
  }
  // middle to bottom
  for (let i = middle + 1; i < n; i++) {
    insideY[grid[i][middle]]++
  }
  for (let i = 0; i < n; i++) {
    if (middle - 1 - i < n && middle + 1 + i < n) {
      insideY[grid[middle - 1 - i][middle + 1 + i]]++
    } else {
      break
    }
  }

  for (let i = 0; i <= 2; i++) {
    outSideY[i] -= insideY[i]
  }

  function getValue(key) {
    const getOtherKeys = () => {
      if (key === 0) {
        return [1, 2]
      }
      if (key === 1) {
        return [0, 2]
      }
      return [0, 1]
    }
    const [a, b] = getOtherKeys()
    return outSideY[key] + Math.min(outSideY[a], outSideY[b]) + insideY[a] + insideY[b]
  }
  return Math.min(
    getValue(0),
    getValue(1),
    getValue(2)
  )

};
console.info(minimumOperationsToWriteY([[0, 1, 0, 1, 0], [2, 1, 0, 1, 2], [2, 2, 2, 0, 1], [2, 2, 2, 2, 2], [2, 1, 2, 2, 2]]))