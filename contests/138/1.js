/**
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @return {number}
 */
var generateKey = function (num1, num2, num3) {
  const convert = (x) => {
    let rs = x
    if (x.length < 4) {
      for (let i = 0; i < 4 - x.length; i++) {
        rs = '0' + rs
      }
    }
    return rs
  }
  const arr = [num1, num2, num3].map(i => convert(i.toString()))
  let rs = []
  for (let i = 0; i < 4; i++) {
    rs += Math.min(Number(arr[0][i]), Number(arr[1][i]), Number(arr[2][i])).toString()
  }
  return Number(rs)
};
console.log(generateKey(9870, 1879, 1798))