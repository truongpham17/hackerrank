// https://leetcode.com/problems/minimum-number-of-valid-strings-to-form-target-i/description/
// MEDIUM-HARD
/**
 * @param {string[]} words
 * @param {string} target
 * @return {number}
 */
var minValidStrings = function (words, target) {
  const maxLps = new Array(target.length).fill(0)
  const building = (word, target) => {
    const lps = Array(word.length).fill(0)
    let l = 0;
    let i = 1
    while (i < word.length) {
      if (word[i] === word[l]) {
        l++
        lps[i] = l
        i++
      } else {
        if (l !== 0) {
          l = lps[l - 1]
        }
        else {
          i++
        }
      }
    }
    i = 0
    j = 0
    while (i < target.length) {
      if (target[i] === word[j]) {
        // start checking here
        maxLps[i] = Math.max(maxLps[i], j + 1)
        i++
        j++
      } else {
        if (j !== 0) {
          j = lps[j - 1]
        } else {
          i++
        }
      }
    }
  }
  for (const word of words) {
    building(word, target)
  }
  let rs = 0
  let l = target.length - 1
  while (l >= 0) {
    rs++
    if (maxLps[l] !== 0) {
      l -= maxLps[l]
    } else {
      return -1
    }
  }
  return rs === 0 ? -1 : rs
};


// console.log(minValidStrings(["abc", "aaaaa", "bcdef"], "aabcdabc"))
console.log(minValidStrings(["aaaaabbaccbcbaaaacb"], "b"))
 