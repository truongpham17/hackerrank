/**
 * @param {number[]} nums
 * @return {number}
 */
var maxGoodNumber = function (nums) {
  const compare = (a, b) => {
    if (a.length > b.length) return true
    if (a.length < b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === '1' && b[i] === '0') return true
      if (a[i] === '0' && b[i] === '1') return false
    }
    return true
  }

  // generate all
  const toString = (a, b, c) => a.toString(2) + b.toString(2) + c.toString(2)
  const [a, b, c] = nums
  const all = [[a, b, c], [a, c, b], [b, a, c], [b, c, a], [c, a, b], [c, b, a]]
  let max = toString(...all[0])
  for (let i = 1; i < 6; i++) {
    const nextString = toString(...all[i])
    if (compare(nextString, max)) {
      max = nextString
    }
  }

  return parseInt(max, 2)
};
console.log(maxGoodNumber([127, 127, 127]))