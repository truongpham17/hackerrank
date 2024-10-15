/**
 * @param {string} s
 * @return {number}
 */
var minLength = function (s) {
  const find = (s, pat) => {
    return s.indexOf(pat)
  }
  while (true) {
    let index = find(s, 'AB')
    if (index === -1) index = find(s, 'CD')
    if (index !== -1) {
      s = s.substring(0, index) + s.substring(index + 2, s.length)
    } else {
      break
    }
  }
  return s.length
};
console.log(minLength('ABFCACDB'))