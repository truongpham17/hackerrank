/**
 * @param {string} s
 * @param {string} part
 * @return {string}
 */
var removeOccurrences = function (s, part) {
  let str = ''
  for (const c of s) {
    str += c
    while (str.endsWith(part)) {
      str = str.substring(0, str.length - part.length)
    }
  }
  return str
};
console.log(removeOccurrences("daabcbaabcbc", "abc"))