/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function (word) {
  let rs = ''
  let count = 0;
  let curChar = ''
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== curChar) {
      if (count > 0) {
        rs += count + curChar
      }
      curChar = word[i]
      count = 1
    } else {
      if (count === 9) {
        rs += 9 + curChar
        count = 1
      } else {
        count++
      }
    }
  }
  if(count > 0) {
    rs += count + curChar
  }
  return rs
};