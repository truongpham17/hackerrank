/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfChild = function (n, k) {
  const div = k % (n - 1);
  const round = Math.floor(k / (n - 1));
  if (round % 2 === 0) {
    return div
  }
  return n - div
};
