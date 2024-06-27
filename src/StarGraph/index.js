/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function (edges) {
  const set = new Set()
  for (const [a, b] of edges) {
    if (set.has(a)) {
      return a
    }
    if (set.has(b)) {
      return b
    }
    set.add(a)
    set.add(b)
  }
};