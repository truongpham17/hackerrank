// source: https://leetcode.com/problems/uncrossed-lines/
/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxUncrossedLines = function (a, b) {
  const l1 = a.length;
  const l2 = b.length;
  const arr = new Array(l1);
  for (let i = 0; i < l1; i++) {
    arr[i] = new Array(l2).fill(0);
  }
  const map = new Map();

  for (let i = 0; i < l1; i++) {
    for (let j = 0; j < l2; j++) {
      let ii = -1;
      if (a[i] === b[j]) {
        map.set(b[j], i);
        ii = i;
      } else {
        if (!map.get(b[j])) {
          for (let k = i; k >= 0; k--) {
            if (a[k] === b[j]) {
              ii = k;
              map.set(b[j], k);
              break;
            }
          }
        } else {
          ii = map.get(b[j]);
        }
      }

      arr[i][j] = Math.max(
        arr[i - 1]?.[j] || 0,
        arr[i][j - 1] || 0,
        ii !== -1 ? (arr[ii - 1]?.[j - 1] || 0) + 1 : 0
      );
    }
  }
  return arr[l1 - 1][l2 - 1];
};

console.log(maxUncrossedLines([1, 4, 2], [1, 2, 4]));
