/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function (expression) {
  // store 0-1, a, b
  const arr = []
  let temp = ''
  let cur = [null, '', '']
  // Function to find the Greatest Common Divisor (GCD) using the Euclidean algorithm
  function gcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  // Function to find the Least Common Multiple (LCM)
  function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
  }

  const newEx = expression.startsWith('-') ? expression + '-' : '+' + expression + '-'
  for (const c of newEx) {
    if (c !== '+' && c !== '-') {
      temp += c
    } else {
      if (cur[0] !== null) {
        const [a, b] = temp.split('/')
        cur[1] = Number(a);
        cur[2] = Number(b)
        arr.push(cur)
      }
      cur = [c, '', '']
      temp = ''
    }
  }
  let least = 1
  for (const [, , v] of arr) {
    least = lcm(least, v)
  }
  let upper = 0
  for (const [d, u, v] of arr) {
    const mul = d === '+' ? 1 : '-1'
    upper += mul * u * (least / v)
  }
  const divide = gcd(Math.abs(upper), least)
  return `${upper / divide}/${least / divide}`
};
console.log(fractionAddition("-1/2+1/2-1/3"))