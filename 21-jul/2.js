/**
 * @param {string} s
 * @return {boolean}
 */
var doesAliceWin = function (s) {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for (const c of s) {
    if (vowels.includes(c)) {
      return true
    }
  }
  return false
};
console.log(doesAliceWin('ifld'))