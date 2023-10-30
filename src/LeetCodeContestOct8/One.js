/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var differenceOfSums = function (n, m) {
  let n1 = 0;
  let n2 = 0;
  for (let i = 1; i <= n; i++) {
    if (i % m !== 0) {
      n2 += i;
    } else {
      n1 += i;
    }
  }
  return n2 - n1;
};
