/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  const rs = []
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i !== j && words[j].includes(words[i])) {
        rs.push(words[i])
        break
      }
    }
  }
  return rs
};