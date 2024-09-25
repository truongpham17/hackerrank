// 191
/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  let i = 0;
  while ((n >> i) > 0) {
    if ((n >> i) & 1) {
      count++
    }
    i++
  }
  return count
};

console.log(hammingWeight(2 ** 31 - 10))

