// source: https://leetcode.com/problems/powx-n/description/
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// using Binary Exponentiation
var myPow = function (x, n) {
  if (x === 1 || x === 0) {
    return x;
  }
  let nn = n < 0 ? -n : n;
  let xx = x;
  let ans = 1;
  while (nn !== 0) {
    if (nn % 2 === 1) {
      ans = ans * xx;
      nn = nn - 1;
    } else {
      xx = xx * xx;
      nn = Math.floor(nn / 2);
    }
  }
  if (n < 0) return 1 / ans;
  return ans;
};
