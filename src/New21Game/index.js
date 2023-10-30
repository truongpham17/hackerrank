// source: https://leetcode.com/problems/new-21-game/
/**
 * @param {number} n
 * @param {number} k
 * @param {number} maxPts
 * @return {number}
 */
var new21Game = function (n, k, maxPts) {
  // p of total <=n
  // if >=k then stop
  // from 1...maxPts, k,n <= 10^4
  const M = maxPts;
  if (k - 1 + M <= n) return 1;
  const p = new Array(k);
  for (let j = 1; j <= k - 1; j++) {
    let sum = 0;
  }
  let rs = 0;
  for (let j = 1; j <= M; j++) {
    // [j, ..., n + j - k] -> n + j - k + 1 - j = n - k + 1
    console.log(j, Math.max(0, (Math.min(M, n + j - k) - j + 1) / M / M));
    rs += Math.max(0, (Math.min(M, n + j - k) - j + 1) / (M - 1) / M);
  }
  return rs;
};

console.log(new21Game(21, 17, 10));
