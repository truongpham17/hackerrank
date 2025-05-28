/**
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
  const isPrefixAndSuffix = (a, b) => {
    return b.startsWith(a) && b.endsWith(a)
  }
  let rs = 0;
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (isPrefixAndSuffix(words[i], words[j])) {
        rs++
      }
    }
  }
  return rs
};