/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
class MyMap {
  map = new Map();
  defaultValue = null
  constructor(defaultValue) {
    this.defaultValue = defaultValue
  }
  add(key, value) {
    if (this.map.has(key)) {
      this.map.set(key, this.map.get(key) + value)
    } else {
      this.map.set(key, value)
    }
  }

  get(key) {
    return this.map.get(key) || this.defaultValue
  }
}

var stringIndices = function (wordsContainer, wordsQuery) {
  // category value: "a": [1,2,3]
  const s = new Map()
  // suffix values: "a" -> "ab" "ac" "ad"
  const k = new Map();
  // arr: current arr, store indexes, suffix: "abcd"
  function construct(arr, suffix) {
    const nextSuffixArr = []
    s.set(suffix, arr)
    const curSuffix = new Map();
    const compareIndex = suffix + 1
    for (const i of arr) {
      // current char of a string
      const currentChar = wordsContainer[i][wordsContainer[i].length - compareIndex]
      if (currentChar) {
        if (curSuffix.has(currentChar)) {
          curSuffix.get(currentChar).push(i)
        } else {
          curSuffix.set(currentChar, [i])
        }
      }
    }
    for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
      // from a to z
      const char = String.fromCharCode(i)
      // get arr from char 
      const charArr = curSuffix.get(char)
      if (charArr?.length > 0) {
        console.log(charArr, char)
        // char+suffix = []
        nextSuffixArr.push(char + suffix)
        s.set(char + suffix, charArr)
        if (charArr?.length > 1) {
          construct(charArr, char + suffix)
        }
      }
    }
    k.set(suffix, nextSuffixArr)
  }
  const indexes = []
  for (let i = 0; i < wordsContainer.length; i++) {
    indexes.push(i)
  }
  construct(indexes, "")
  console.log("s", s)
  console.log("k", k)
};
console.log(stringIndices(["abcd", "bcd", "xbcd"], ["cd", "bcd", "xyz"]))