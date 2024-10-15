/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
  //{'a', 'e', 'i', 'o', and 'u'}
  const consonants = ['a', 'e', 'i', 'o', 'u']
  const keys = ['a', 'e', 'i', 'o', 'u', 'z']
  const prefix = []
  prefix[0] = {
    'a': 0,
    'e': 0,
    'i': 0,
    'o': 0,
    'u': 0,
    'z': 0
  }
  for (let i = 0; i < word.length; i++) {
    let temp
    if (i > 0) {
      temp = { ...prefix[prefix.length - 1] }
    } else {
      temp = prefix[0]
    }

    const c = word[i]
    if (consonants.includes(c)) {
      temp[c]++
    } else {
      temp['z']++
    }
    if (i > 0) {
      prefix.push(temp)
    }

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

  const check = (l, r) => {
    const value = { ...prefix[r] }
    if (l > 0) {
      for (const key of keys) {
        value[key] -= prefix[l - 1][key]
      }
    }
    const good = isGood(value)
    return good
  }

  while (r < word.length) {
    const good = check(l, r)
    // redundant
    if (good === 1) {
      l++
      r = Math.max(l, r)
    }
    else if (good === -1) {
      r++
    } else {
      // l and r moving to the next 'z'
      rs++
      while (l + 1 < word.length && consonant s.includes(word[l + 1])) {
        r++
        if (isGood(l, r + 1) === true) {
          rs++
        }
      }
    }
  }
  return rs
};
console.log(countOfSubstrings('iebufaoioe', 2))