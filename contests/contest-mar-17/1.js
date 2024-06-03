/**
 * @param {string} s
 * @return {boolean}
 */
var isSubstringPresent = function (s) {
  let reverseString = ''
  if(s.length === 1) return false;
  for (let i = 0; i < s.length; i++) {
    reverseString += s[s.length - 1 - i]

  }
  for (let i = 0; i < s.length; i++) {
    if (reverseString.includes(s[i] + s[i + 1])) {
      return true
    }
  }
  return false

};