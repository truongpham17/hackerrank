// source: https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/
// Difficulty level: HARD
/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var numOfArrays = function (n, m, k) {
  // we have k so we have: from 0...m
  // so we have to end with m - k + 1 ... k
  // m = 10, k = 5 -> start at 6 = m - k + 1
  /**
   * 1 <= n <= 50
  1 <= m <= 100
  0 <= k <= n
    n > m - k + 1 -> return 0
  //1 .. k
  start at 1 until m - k + 1
  we have n items
  if first item start at 1, then second item start at what?

   */
};
