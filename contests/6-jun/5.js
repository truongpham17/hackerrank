/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var getEncryptedString = function (s, k) {
  const l = s.length
  const div = k % l
  for (let i = 0; i < l - 1; i++) {
    s += s[i]
  }
  let result = ''
  for (let i = 0; i < l; i++) {
    result += s[i + div]
  }
  return result
};
console.log(getEncryptedString('dart', 7))