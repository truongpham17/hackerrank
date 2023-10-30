// source: https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let temp = 1 << 0;
  let rs = 0;
  const max = Math.max(a, b, c);
  while (temp <= max) {
    //0
    if ((temp & c) === 0) {
      if ((temp & a) !== 0) rs++;
      if ((temp & b) !== 0) rs++;
    } else {
      if ((temp & a) === 0 && (temp & b) === 0) rs++;
    }
    temp = temp << 1;
  }
  return rs;
};

console.log(minFlips(8, 3, 5));
