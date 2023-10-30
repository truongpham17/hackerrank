// source: https://leetcode.com/problems/stone-game-iii/
/**
 * @param {number[]} stoneValue
 * @return {string}
 */
var stoneGameIII = function (stoneValue) {
  const n = stoneValue.length;
  const sumPoints = [0];
  let curSum = 0;
  for (let i = n - 1; i >= 0; i--) {
    curSum += stoneValue[i];
    sumPoints.push(curSum);
  }
  const mapValues = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    mapValues[i] = new Array(4);
  }

  // i last stones with j steps
  function getData(i, j) {
    if (i === 0) return 0;
    // step > i then get whole last stones
    if (j >= i) {
      let max = -1000000;
      for (let c = 1; c <= i; c++) {
        if (max < sumPoints[i] - sumPoints[i - c]) {
          max = sumPoints[i] - sumPoints[i - c];
        }
      }
      return max;
    }
    return mapValues[i][j];
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(3, i); j++) {
      let max = -1000000;
      for (let k = 1; k <= j; k++) {
        const temp = sumPoints[i] - getData(i - k, 3);
        if (temp > max) max = temp;
      }
      mapValues[i][j] = max;
    }
  }
  const alicePoints = mapValues[n][Math.min(n, 3)];
  const bobPoints = sumPoints[n] - alicePoints;
  if (alicePoints > bobPoints) {
    return 'Alice';
  } else if (alicePoints < bobPoints) {
    return 'Bob';
  }
  return 'Tie';
};
