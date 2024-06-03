/**
 * @param {number[][]} points
 * @param {number} w
 * @return {number}
 */
var minRectanglesToCoverPoints = function (points, w) {
  const xs = points.map(i => i[0]).sort((a, b) => a - b)
  const dp = [1]
  const getTop = () => dp[dp.length - 1]
  const getPrevTop = (value) => {
    let i = dp.length - 1
    while (i >= 0) {
      if (xs[i] + w < value) {
        return dp[i]
      }
      i--
    }
    return 0
  }
  for (let i = 1; i < xs.length; i++) {
    const value = xs[i] - xs[i - 1] > w ? getTop() + 1 : getPrevTop(xs[i]) + 1
    dp.push(value)
  }
  return getTop()
};
console.log(minRectanglesToCoverPoints([[2,1],[1,0],[1,4],[1,8],[3,5],[4,6]], 1))