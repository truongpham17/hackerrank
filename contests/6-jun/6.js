/**
 * @param {number} n
 * @return {string[]}
 */
var validStrings = function (n) {
  const dp = Array.from({ length: n }, () => [[], []])
  dp[0][0] = ["0"]
  dp[0][1] = ["1"]
  for (let i = 1; i < n; i++) {
    for (const d of dp[i - 1][1]) {
      dp[i][0].push(d + "0")
      dp[i][1].push(d + "1")
    }
    for (const d of dp[i - 1][0]) {
      dp[i][1].push(d + "1")
    }
  }
  return [...dp[n-1][0], ...dp[n-1][1]]
};
console.log(validStrings(1))