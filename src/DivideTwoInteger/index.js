// 29 MEDIUM
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
  const MAX = 2147483647
  const MIN = -2147483648

  if (dividend === MIN && divisor === 1) {
    return -2147483648
  }
  if (dividend === MIN && divisor === MIN) {
    return 1
  }
  if (dividend === MIN && divisor === -1) {
    return MAX
  }

  const sign = ((dividend < 0) === (divisor < 0))

  let result = 0;

  dividend = Math.abs(dividend)
  divisor = Math.abs(divisor)
  while (dividend >= divisor) {
    let count = 0;
    while (((divisor << (count + 1)) > 0) && dividend > (divisor << (count + 1))) {
      count++
    }
    result += (1 << count)
    dividend -= (divisor << count)
  }

  if (result > MAX && sign === 1) return MAX
  if (!sign) return -result
  return result
};
console.log(divide(7, -3))