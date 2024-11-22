/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const prefix = [code[0]]
  for (let i = 1; i < code.length; i++) {
    prefix.push(prefix[prefix.length - 1] + code[i])
  }
  for (let i = 0; i < code.length; i++) {
    prefix.push(prefix[prefix.length - 1] + code[i])
  }
  let pivot = k >= 0 ? 0 : code.length
  const rs = []
  for (let i = 0; i < code.length; i++) {
    if (k >= 0) {
      rs.push(prefix[pivot + i + k] - prefix[pivot + i])
    } else {
      rs.push(prefix[pivot + i - 1] - prefix[pivot + i + k - 1])
    }
  }
  return rs
};
console.log(decrypt([5, 7, 1, 4], 3))
console.log(decrypt([2, 4, 9, 3], -2))
console.log(decrypt([1, 2, 3, 4], 0))