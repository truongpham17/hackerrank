/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  let result = [s[0]]

  let havePush = false
  for (let i = 0; i < s.length - 1; i++) {
    result.push(s[i + 1])
    const num1 = Number(s[i])
    const num2 = Number(s[i + 1])
    if (num1 % 2 === num2 % 2 && num1 > num2 && !havePush) {
      havePush = true
      result[i] = num2;
      result[i + 1] = num1
    }
  }
  return result.reduce((a, b) => a + b, '')
};
console.log(getSmallestString('45320'))