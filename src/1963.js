/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {
  let count = 0;
  for (const c of s) {
    count += (c === '[') - (c === ']')
    count = Math.max(0, count)
  }
  return Math.floor((count + 1) / 2)
};
console.log(minSwaps("][][]["))