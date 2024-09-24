/**
 * @param {string} number
 * @param {character} digit
 * @return {string}
 */
var removeDigit = function (number, digit) {
  let lastIndex = -1
  for (let i = 0; i < number.length; i++) {
    if (number[i] === digit) {
      lastIndex = i
      if (i < number.length - 1 && number[i] < number[i + 1]) {
        return number.slice(0, i) + number.slice(i + 1)
      }
    }
  }
  return number.slice(0, lastIndex) + number.slice(lastIndex + 1)
};