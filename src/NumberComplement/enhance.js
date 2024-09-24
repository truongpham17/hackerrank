/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let mul = 0;
  let ans = 0;
  while (num) {
    if ((num & 1) === 0) {
      ans += 2 ** mul
    }
    num >>= 1
    mul++
  }
  return ans
};
console.log(findComplement(5))