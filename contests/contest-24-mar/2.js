/**
 * @param {number} k
 * @return {number}
 */
var minOperations = function (k) {
  const value = (-1 + Math.sqrt(4 * k)) / 2;
  const min = Math.floor(value);
  const max = Math.ceil(value);
  
  if ((1 + min) * min >= k) {
    return min + min - 1
  }
  if ((1 + min) * max >= k || (1 + max) * min >= k) {
    return min + max - 1
  }
  return max + max - 1
};
console.log(minOperations(11))