/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function (start, goal) {
  let ans = start ^ goal;
  let count = 0;
  while (ans) {
    if (ans & 1 === 1) {
      count++;
    }
    ans = ans >> 1;
  }
  return count;
};