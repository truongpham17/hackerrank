/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let rs = [0, 1]

  for (let i = 2; i <= n; i++) {
    const size = rs.length
    for (let j = 0; j < size; j++) {
      rs.push(rs[j] ^ (1 << (i - 1) | (1 << (i - 2))))
    }
  }
  return rs
};
// 000 001 101 111 011 010 110 
// 0 1 -> 00 01 11 10