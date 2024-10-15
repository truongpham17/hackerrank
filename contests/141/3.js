/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  //{'a', 'e', 'i', 'o', and 'u'}
  const consonants = ['a', 'e', 'i', 'o', 'u']
  const keys = ['a', 'e', 'i', 'o', 'u', 'z']

  const prefix = {
    'a': 0,
    'e': 0,
    'i': 0,
    'o': 0,
    'u': 0,
    'z': 0
  }

  const isGood = (map) => {
    if (map['z'] < k) return -1
    if (map['z'] > k) return 1
    for (const c of consonants) {
      if (map[c] === 0) return -1
    }
    return true
  }

  let rs = 0
  let l = 0;
  let r = 0;

  const increase = c => {
    if (consonants.includes(word[r])) {
      prefix[word[r]]++

    } else {
      prefix['z']++
    }
  }
  const decrease = c => {
    if (consonants.includes(word[r])) {
      prefix[word[r]]--

    } else {
      prefix['z']--
    }
  }

  increase(word[0])

  while (r < word.length) {
    if (prefix['z'] < k) {
      r++
      increase(word[r])
      continue
    }

    if (prefix['z'] === k) {
      let nextR = r;
      while (nextR + 1 < word.length && consonants.includes(word[nextR + 1])) {
        nextR++
      }
      let nextL = l
      while (nextL + 1 < word.length && nextL < r && consonants.includes(word[nextL + 1])) {
        nextL++
      }

      // next R is the last consonant
      while (l <= nextL && consonants.includes(word[l]) && r <= nextR) {
        if (isGood(prefix) === true) {
          rs += nextR - r + 1
          decrease(word[l])
          l++
        } else {
          r++
          increase(word[r])
        }
      }

      if (consonants.includes(word[l])) {
        decrease(word[l])
        l++
      }

      while (r <= nextR) {
        r++
        increase(word[r])
      }
    }
  }
  return rs
};
console.log(countOfSubstrings('ieaouqqieaouqq', 1))