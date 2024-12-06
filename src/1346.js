/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  const set = new Set();
  for (const x of arr) {
    if (set.has(x)) {
      return true
    }
    set.add(x / 2)
    set.add(x * 2)
  }
  return false
};