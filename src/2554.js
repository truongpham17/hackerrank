/**
 * @param {number[]} banned
 * @param {number} n
 * @param {number} maxSum
 * @return {number}
 */
var maxCount = function (banned, n, maxSum) {
  let count = 0;
  let sum = 0;
  const set = new Set(banned)
  for (let i = 1; i <= n; i++) {
    if (sum + i > maxSum) break
    if (!set.has(i)) {
      sum += i;
      count++
    }
  }
  return count
};