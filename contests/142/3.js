/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} stayScore
 * @param {number[][]} travelScore
 * @return {number}
 */
var maxScore = function (n, k, stayScore, travelScore) {
  const dp = Array.from({ length: k }, () => Array(n).fill(0))
  for (let city = 0; city < n; city++) {
    dp[0][city] = stayScore[0][city]
  }

  for (let day = 0; day < k; day++) {
    for (let city = 0; city < n; city++) {
      // for staying
      if (day > 0) {
        dp[day][city] = Math.max(dp[day][city], stayScore[day][city] + dp[day - 1][city])
      }

      for (let oldCity = 0; oldCity < n; oldCity++) {
        if (oldCity !== city) {
          dp[day][city] = Math.max(dp[day][city], (day > 0 ? dp[day - 1][oldCity] : 0) + travelScore[oldCity][city])
        }
      }
    }
  }
  let max = 0;
  for (let city = 0; city < n; city++) {
    max = Math.max(max, dp[k - 1][city])
  }
  return max
};

console.log(
  maxScore(
    2, 1, [[1, 1]], [[0, 1], [6, 0]])
)