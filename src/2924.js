/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findChampion = function (n, edges) {
  const arr = Array(n).fill(true)
  for (const [, b] of edges) {
    arr[b] = false
  }
  let rs = -1
  for (let i = 0; i < n; i++) {
    if (arr[i]) {
      if (rs !== -1) return -1
      rs = i
    }
  }
  return rs
};