/**
 * @param {number[][]} points
 * @param {number} w
 * @return {number}
 */
var minRectanglesToCoverPoints = function (points, w) {
  const xs = points.map(i => i[0]).sort((a, b) => a - b)
  const dp = []
  for (let i = 0; i <= xs[xs.length - 1]; i++) {
    dp.push(0)
  }

  const getTop = () => dp[dp.length - 1]

  let cur = 0
  for (let i = 0; i <= xs[xs.length - 1]; i++) {
    if (i !== xs[cur]) {
      dp[i] = dp[i - 1] || 0
      continue
    }
    if (i === 0) {
      dp[i] = 1
    } else if (cur < 1) {
      dp[i] = 1
    } else {
      const value = xs[cur] - xs[cur - 1] > w ? dp[i - 1] + 1 : (dp[i - w - 1] || 0) + 1
      dp[i] = value
    }
    cur++
    while (xs[cur] === i) {
      cur++
    }
  }
  return getTop()
};
console.log(minRectanglesToCoverPoints([[1, 4], [6, 6], [8, 4], [2, 3]], 1))