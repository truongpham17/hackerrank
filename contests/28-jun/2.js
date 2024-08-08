/**
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var nonSpecialCount = function (l, r) {
  const isSpecial = (value) => {
    for (let i = 2; i <= Math.sqrt(value); i++) {
      if (value % i === 0) {
        return false
      }
    }
    return true
  }
  let special = 0;
  for (let i = Math.max(Math.ceil(Math.sqrt(l)), 2); i * i <= r; i++) {
    if (isSpecial(i)) {
      special++
    }
  }
  return r - l + 1 - special
};
console.log(nonSpecialCount(4, 16))