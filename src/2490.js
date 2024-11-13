/**
 * @param {string} sentence
 * @return {boolean}
 */
var isCircularSentence = function (sentence) {
  const words = sentence.split(' ')
  const n = words.length
  for (let i = 0; i < n; i++) {
    const nextIndex = (i + 1) % n
    if (words[i][words[i].length - 1] !== words[nextIndex][0]) {
      return false
    }
  }
  return true
};