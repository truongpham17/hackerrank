/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let rs = ''
  const bn = num.toString(2)
  for (const c of bn) {
    rs += c === '0' ? '1' : '0'
  }
  return parseInt(rs, 2)
};
console.log(findComplement(5))