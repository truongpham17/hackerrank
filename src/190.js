/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let rs = 0;
  for (let i = 0; i <= 31; i++) {
    if (n & (1 << i)) {
      rs |= 1 << (31 - i)
    }
  }
  if (rs >> 31 & 1) {
    rs ^= (1 << 31)
    rs += 2 ** 31
  }
  return rs 
};
// 00000010100101000001111010011100
// 00111001011110000010100101000000
// 00111001011110000010100101000000
console.log(reverseBits(43261596))