/**
 * @param {string} s
 * @param {number[]} spaces
 * @return {string}
 */
var addSpaces = function (s, spaces) {
  let slide = 0;
  const rs = []
  for (let i = 0; i < s.length; i++) {
    if (i === spaces[slide]) {
      rs.push(' ')
      slide++
    }
    rs.push(s[i])
  }
  return rs.join('')
};