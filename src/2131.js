/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
  const obj = new Array(1000).fill(0)

  const toId = (str) => (str.charCodeAt(0) - 97) * 26 + str.charCodeAt(1) - 97

  const getValue = (word) => {
    const id = toId(word);
    return obj[id]
  }


  const incr = (word, value) => {
    const id = toId(word);
    obj[id] += value
  }

  for (const word of words) {
    incr(word, 1)
  }

  let rs = 0;
  const reverseId = (str) => (str.charCodeAt(1) - 97) * 26 + str.charCodeAt(0) - 97
  for (const word of words) {
    if (toId(word) === reverseId(word)) {
      if (getValue(word) >= 2) {
        rs += 4;
        incr(word, -2)
      }
    } else {
      if (getValue(word) && obj[reverseId(word)]) {
        incr(word, -1)
        obj[reverseId(word)]--
        rs += 4;
      }
    }
  }
  for (const word of words) {
    if (toId(word) === reverseId(word) && getValue(word) > 0) {
      rs += 2;
      break
    }
  }
  return rs;
};
// ["dd","aa","bb","dd","aa","dd","bb","dd","aa","cc","bb","cc","dd","cc"]
console.log(longestPalindrome(["dd", "aa", "bb", "dd", "aa", "dd", "bb", "dd", "aa", "cc", "bb", "cc", "dd", "cc"]))

/**
 * 
 * 
 */