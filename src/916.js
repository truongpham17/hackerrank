/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
  const dict = {}
  const update = (newDict) => {
    for (const c of Object.keys(newDict)) {
      if ((dict[c] || 0) < newDict[c]) {
        dict[c] = newDict[c]
      }
    }
  }
  const countChar = (word) => {
    const newDict = {}
    for (const c of word) {
      if (!newDict[c]) {
        newDict[c] = 0
      }
      newDict[c]++
    }
    return newDict
  }

  for (const word of words2) {
    update(countChar(word))
  }

  const rs = []
  const fullKeys = Object.keys(dict)
  for (const word of words1) {
    const count = countChar(word)
    let isMatch = true
    for (const c of fullKeys) {
      if ((count[c] || 0) < dict[c]) {
        isMatch = false;
        break
      }
    }
    if (isMatch) {
      rs.push(word)
    }
  }
  return rs

};