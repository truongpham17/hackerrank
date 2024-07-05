/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximumImportance = function (n, roads) {
  const arr = new Array(n).fill(0)
  for (const [a, b] of roads) {
    arr[a]++
    arr[b]++
  }
  arr.sort((a, b) => b - a)
  return arr.reduce((prev, cur, index) => prev + (n - index) * cur, 0)
};
console.log(maximumImportance(5, [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [2, 4]]))