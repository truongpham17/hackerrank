/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function (n) {
  let user = true;
  let count = 10
  while (n >= 0) {
    if (n >= count) {
      n -= count
      user = !user
      count--
    } else {
      return !user
    }
  }
};
console.log(canAliceWin(26))