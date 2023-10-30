// source: https://leetcode.com/problems/maximize-score-after-n-operations/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
  const n = nums.length;
  const states = new Array(1 << n).fill(0);
  const values = [];
  for (let i = 0; i < n; i++) {
    values.push(new Array(n).fill(0));
  }

  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      values[i][j] = gcd(nums[i], nums[j]);
      values[j][i] = values[i][j];
    }
  }

  function dfs(state, steps) {
    if (steps === 0) return 0;
    if (states[state]) return states[state];
    const availables = [];
    for (let i = 0; i < n; i++) {
      if (state & (1 << i)) {
        availables.push(i);
      }
    }

    let max = 0;

    let aboveOne = false;
    for (let i = 0; i < availables.length; i++) {
      for (let j = i + 1; j < availables.length; j++) {
        const gcdValue = values[availables[i]][availables[j]];

        if (gcdValue > 1) {
          let maxWithoutIJ = 0;
          for (let ii = 0; ii < availables.length; ii++) {
            for (let jj = ii + 1; jj < availables.length; jj++) {
              if (ii !== i && jj !== j) {
                maxWithoutIJ = Math.max(
                  maxWithoutIJ,
                  values[availables[ii]][availables[jj]]
                );
              }
            }
          }
          if (maxWithoutIJ <= gcdValue) {
            max = Math.max(
              max,
              gcdValue * steps +
                dfs(
                  state & (~(1 << availables[i]) & ~(1 << availables[j])),
                  steps - 1
                )
            );
            aboveOne = true;
          }
        }
      }
    }
    if (!aboveOne) max = (steps * (steps + 1)) / 2;
    states[state] = max;
    return max;
  }

  return dfs((1 << n) - 1, n / 2);
};
