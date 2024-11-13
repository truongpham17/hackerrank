/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function (candidates) {
  const arr = Array(28).fill(0)
  for (const candidate of candidates) {
    let num = candidate;
    let shift = 0
    while (num > 0) {
      if (num & 1) {
        arr[shift]++
      }
      num >>= 1
      shift++
    }
  }
  return Math.max(...arr)
};