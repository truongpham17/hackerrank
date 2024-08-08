/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors, k) {
  for (let i = 0; i < k - 1; i++) {
    colors.push(colors[i])
  }
  let result = 0;
  let dp = Array(colors.length).fill(0)
  for (let i = 0; i < colors.length - 1; i++) {
    if (colors[i + 1] !== colors[i]) {
      dp[i + 1] = dp[i] + 1
    } else {
      dp[i + 1] = 0
    }
    if (dp[i + 1] >= k - 1) {
      result++
    }
  }


  return result
};

console.log(numberOfAlternatingGroups([0, 1, 0, 0, 1, 0, 1], 6))