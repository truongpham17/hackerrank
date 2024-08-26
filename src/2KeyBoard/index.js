// https://leetcode.com/problems/2-keys-keyboard/description/
// MEDIUM
/**
 * @param {number} n
 * @return {number}
 */
var minSteps = function (n) {
  function findMaxDivisor(x) {
    for (let i = 2; i <= Math.sqrt(x); i++) {
      if (x % i === 0) {
        return Math.max(i, x % i)
      }
    }
    return -1
  }

  function find(x) {
    const divisor = findMaxDivisor(x)
    if (divisor !== -1) return find(x / divisor) + divisor
    return x
  }
  
  if (n === 1) return 0
  return find(n)
};
console.log(minSteps(108))