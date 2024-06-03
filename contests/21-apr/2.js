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

  const isLowerCase = (char) => {
    return char.charCodeAt(0)>=97
  }
  const set = new Set();
  const resultSet = new Set();
  const blackListSet = new Set()
  for (const char of word) {
    if (set.has(char)) {
      resultSet.add(char.toLocaleLowerCase())
    }

    set.add(convertCharacter(char))

    if(resultSet.has(char.toLocaleLowerCase())){
      if(isLowerCase(char)){
        blackListSet.add(char.toLocaleLowerCase())
      }
    }
  }
  return resultSet.size - blackListSet.size
};

console.log(numberOfSpecialChars("aaAbcBCa"))