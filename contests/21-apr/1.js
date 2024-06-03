/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function (word) {
  const convertCharacter = (char) => {
    if (char.charCodeAt(0) >= 97) {
      return String.fromCharCode(char.charCodeAt(0) - 32)
    }
    return String.fromCharCode(char.charCodeAt(0) + 32)
  }
  const set = new Set();
  const resultSet = new Set();
  for (const char of word) {
    if (set.has(char)) {
      resultSet.add(char.toLocaleLowerCase())
    }

    set.add(convertCharacter(char))
  }
  return resultSet.size
};

console.log(numberOfSpecialChars("aaAbcBCAsaaBbb"))