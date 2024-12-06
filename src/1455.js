/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
var isPrefixOfWord = function (sentence, searchWord) {
  const check = (word, search) => {
    for (let i = 0; i < search.length; i++) {
      if (search[i] !== word[i]) return false
    }
    return true
  }
  
  const words = sentence.split(' ')
  for (let i = 0; i < words.length; i++) {
    if (check(words[i], searchWord)) {
      return i + 1
    }
  }
  return -1
};