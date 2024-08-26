/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const n = piles.length
  // person, ending index, M
  const dp = Array.from({ length: 2 }, () => Array.from({ length: n }, () => ({
    value: 0,
    m: 0
  })))

  dp[0][0] = {
    value: piles[0],
    m: 1
  }
  dp[1][0] = {
    values: 0,
    m: 1
  }
  let sum = 0;
  const sumArr = []
  for (const v of piles) {
    sum += v
    sumArr.push(sum)
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      let m = dp[0][j].m
      if (j + 2 * m >= i) {
        if (sumArr[i] - dp[0][j].value > dp[1][i].value) {
          dp[1][i].value = sumArr[i] - dp[0][j].value
          dp[1][i].m = Math.max(m, i - j)
        }

      }
      m = dp[1][j].m

      if (j + 2 * m >= i) {
        if (sumArr[i] - dp[1][j].value > dp[0][i].value) {
          dp[0][i].value = sumArr[i] - dp[1][j].value
          dp[0][i].m = Math.max(m, i - j)
        }
      }

    }
  }
  console.log(dp)
};
console.log(stoneGameII([2, 7, 9, 4, 4]))