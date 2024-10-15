/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  const cons = ['a', 'e', 'i', 'o', 'u']
  let count = 0;
  const isGood = (map, wordLength) => {
    let coCount = 0;
    for (const c of cons) {
      if (map[c.charCodeAt(0) - 97] === 0) return false
      coCount += map[c.charCodeAt(0) - 97]
    }
    if (wordLength - coCount === k) return true
    return false
  }
  for (let i = 0; i < word.length; i++) {
    const obj = Array(30).fill(0)
    for (let j = i; j < word.length; j++) {
      obj[word[j].charCodeAt(0) - 97]++
      if (isGood(obj, j - i + 1)) {
        count++
      }
    }
  }
  return count
};
console.log(countOfSubstrings('ieaouqqieaouqq', 1))