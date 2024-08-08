/**
 * @param {number} n
 * @param {number} time
 * @return {number}
 */
var passThePillow = function (n, time) {
  const div = time % (n - 1)
  const mod = Math.floor(time / (n - 1))
  // odd
  if (mod & 1) {
    return n - div
  } else {
    return div + 1
  }
};