/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumSum = function (grid) {
  const row = grid.length;
  const col = grid[0].length;

  let result = 10 ** 10

  const map = new Map();

  const minimumArea = function ([row1, col1, row2, col2]) {
    const key = row1 * 30 ** 3 + col1 * 30 ** 2 + row2 * 30 + col2;
    if (map.has(key)) {
      return map.get(key)
    }
    let maxI = 0;
    let minI = 10 ** 10;
    let maxJ = 0;
    let minJ = 10 ** 10;
    let isFound = false;
    for (let i = row1; i < row2; i++) {
      for (let j = col1; j < col2; j++) {
        if (grid[i][j] === 1) {
          isFound = true;
          if (i > maxI) {
            maxI = i
          }
          if (i < minI) {
            minI = i
          }
          if (j > maxJ) {
            maxJ = j
          }
          if (j < minJ) {
            minJ = j
          }
        }
      }
    }
    const value = !isFound ? 0 : Math.abs((maxI - minI + 1) * (maxJ - minJ + 1))
    map.set(key, value)
    return value
  };


  const mergeTwoRec = ([r1, c1, r2, c2], [r11, c11, r22, c22]) => {
    return [Math.min(r1, r11), Math.min(c1, c11), Math.max(r2, r22), Math.max(c2, c22)]
  }

  const updateMinValue = (rectangles) => {
    const minAreas = rectangles.map(minimumArea);
    if (rectangles.length === 3) {
      const sum = minAreas.reduce((prev, cur) => prev + cur, 0);
      if (sum < result) {
        result = sum
      }
    } else {
      const [a, b, c, d] = rectangles;
      updateMinValue([mergeTwoRec(a, b), c, d])
      updateMinValue([mergeTwoRec(a, c), b, d])
      updateMinValue([mergeTwoRec(b, d), a, c])
      updateMinValue([mergeTwoRec(c, d), a, b])
    }
  }

  for (let i = 1; i < row + col; i++) {
    for (let j = i + 1; j < row + col; j++) {
      if (i === row || j === row) continue;
      const rects = []
      // horizontal cut
      if (i < row) {
        //  2 horizontal cut
        if (j < row) {
          rects.push([0, 0, i, col])
          rects.push([i, 0, j, col])
          rects.push([j, 0, row, col])
          updateMinValue(rects)
        } else {// horizontal vs vertical cut
          rects.push([0, 0, i, j - row])
          rects.push([0, j - row, i, col])
          rects.push([i, 0, row, j - row])
          rects.push([i, j - row, row, col])
          updateMinValue(rects)
        }
      } else {//2 vertical cut
        rects.push([0, 0, row, i - row])
        rects.push([0, i - row, row, j - row])
        rects.push([0, j - row, row, col])
        updateMinValue(rects)
      }
    }
  }
  return result
};


console.log(minimumSum([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0], [0, 1, 1, 1, 1]]))
/**
 * KEYWORDS: rectangle, min area, slicing
 */