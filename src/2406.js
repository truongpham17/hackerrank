/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minGroups = function (intervals) {
  const pivot = {}
  for (const [l, r] of intervals) {
    if (pivot[l] === undefined) {
      pivot[l] = 0
    }
    if (pivot[r + 1] === undefined) {
      pivot[r + 1] = 0
    }
    pivot[l]++
    pivot[r + 1]--
  }
  const keys = Object.keys(pivot).sort((a, b) => a - b)
  let overlap = 0
  let maxOverlap = 0
  for (const key of keys) {
    overlap += pivot[key]
    maxOverlap = Math.max(maxOverlap, overlap)
  }
  return maxOverlap
};