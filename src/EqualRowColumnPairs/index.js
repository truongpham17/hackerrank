// source: https://leetcode.com/problems/equal-row-and-column-pairs/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function (grid) {
  const rows = new Map();
  const n = grid.length;
  for (let i = 0; i < n; i++) {
    let s = '';
    for (let j = 0; j < n; j++) {
      s += grid[i][j] + '_';
    }
    if (rows.has(s)) {
      rows.set(s, rows.get(s) + 1);
    } else {
      rows.set(s, 1);
    }
  }
  let result = 0;
  for (let i = 0; i < n; i++) {
    let s = '';
    for (let j = 0; j < n; j++) {
      s += grid[j][i] + '_';
    }
    if (rows.has(s)) {
      result += rows.get(s);
    }
  }
  return result;
};
