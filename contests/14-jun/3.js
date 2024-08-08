/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  // cut from i to j - 1
  function cut(x1, y1, x2, y2) {
    // 0 means h 1 means v
    let maxObj = { direction: -1, value: -1 }
    let temp = - 1
    for (let i = x1; i < x2 - 1; i++) {
      if (horizontalCut[i] > maxObj.value) {
        maxObj.value = horizontalCut[i]
        maxObj.direction = 0
        temp = i
      }
    }
    for (let j = y1; j < y2 - 1; j++) {
      if (verticalCut[j] > maxObj.value) {
        maxObj.value = verticalCut[j]
        maxObj.direction = 1
        temp = j
      }
    }


    switch (maxObj.direction) {
      case -1: return 0
      case 0: return maxObj.value + cut(x1, y1, temp + 1, y2) + cut(temp + 1, y1, x2, y2)
      case 1: return maxObj.value + cut(x1, y1, x2, temp + 1) + cut(x1, temp + 1, x2, y2)
    }
  }
  return cut(0, 0, m, n)
};
console.log(minimumCost(3, 2, [1, 3], [5]))