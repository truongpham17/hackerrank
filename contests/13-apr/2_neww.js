/**
 * @param {number[][]} points
 * @param {number} w
 * @return {number}
 */
var minRectanglesToCoverPoints = function (points, w) {
  const xs = points.map(i => i[0]).sort((a, b) => a - b)
  const dp = []

  const getTop = () => dp[dp.length - 1]
  let curMin = -1;
  dp[0] = 1

  for (let pos = 1; pos < xs.length; pos++) {
    while (curMin < 0 || xs[curMin] < xs[pos] - w - 1) {
      curMin++
    }
    if (curMin === pos) {
      curMin--
    }
    console.log("🚀 ~ minRectanglesToCoverPoints ~ curMin:", curMin)

    if (xs[pos] === xs[pos - 1]) {
      dp.push(dp[pos - 1])
      continue
    }
    if (xs[pos] - xs[pos - 1] > w) {
      dp.push(dp[pos - 1] + 1)
    } else {
      if (curMin < 0) {
        dp.push(1)
      } else {
        dp.push(dp[curMin] + 1)
      }
    }
  }
  console.log(dp)
  return getTop()
};
console.log(minRectanglesToCoverPoints([[12, 7], [8, 12], [9, 1], [20, 15]], 2))