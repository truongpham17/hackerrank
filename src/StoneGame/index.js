// source: https://leetcode.com/problems/stone-game-ii/
/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function (piles) {
  const n = piles.length;
  // sumPoints[i] = total sum of i last elements
  const sumPoints = [0];
  let curSum = 0;
  for (let i = n - 1; i >= 0; i--) {
    curSum += piles[i];
    sumPoints.push(curSum);
  }
  const mapValues = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    mapValues[i] = new Array(n);
  }
  // i last stones with j steps
  function getData(i, j) {
    // step > i then get whole last stones
    if (j >= i) return sumPoints[i];
    return mapValues[i][j];
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (j >= i) {
        mapValues[i][j] = sumPoints[i];
        break;
      }
      let max = 0;
      for (let k = 1; k <= j; k++) {
        const temp = sumPoints[i] - getData(i - k, Math.max(k * 2, j));
        if (temp > max) max = temp;
      }
      mapValues[i][j] = max;
    }
  }
  return mapValues[n][Math.min(n, 2)];
};
console.log(stoneGameII([77, 12, 64, 35, 28, 4, 87, 21, 20]));
