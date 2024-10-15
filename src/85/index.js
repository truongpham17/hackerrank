/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  const arr = Array(matrix[0].length).fill(0)
  const findLargestRec = (arr) => {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) continue;
      max = Math.max(arr[i], max)
      let iMin = arr[i];
      for (let j = i - 1; j >= 0; j--) {
        iMin = Math.min(arr[j], iMin)
        if (iMin === 0) break;
        max = Math.max(max, iMin * (i - j + 1))
      }
    }
    return max
  }
  let rs = 0
  for (const row of matrix) {
    for (let i = 0; i < row.length; i++) {
      const cell = row[i]
      if (cell === '0') {
        arr[i] = 0
      } else {
        arr[i]++
      }
    }
    rs = Math.max(rs, findLargestRec(arr))
  }
  return rs
};
console.log(maximalRectangle([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]))