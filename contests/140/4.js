

/**
 * @param {string} s
 * @param {string} pattern
 * @return {number}
 */
var minStartingIndex = function (s, pattern) {

  if (pattern.length === 1) return 0
  if (pattern.length === 2) {
    const a = pattern[0]
    const b = pattern[1]
    for (let i = 0; i < s.length; i++) {
      if (s[i] === b && i > 0) {
        return i - 1
      }
      if (s[i] === a) return i


    }
  }
  const KMP = (string, pat) => {
    const constructLps = (pat) => {
      const lps = Array(pat.length).fill(0)
      let len = 0
      let i = 1
      while (i < pat.length) {
        if (pat[i] === pat[len]) {
          len++
          lps[i] = len
          i++
        } else {
          if (len !== 0) {
            len = lps[len - 1]
          } else {
            i++
          }
        }
      }

      return lps
    }

    const lps = constructLps(pat)

    let i = 0
    let j = 0 // pat

    const rs = Array(string.length).fill(0)

    while (i < string.length) {
      if (pat[j] === string[i]) {
        j++
        rs[i] = j
        i++
      } else {
        if (j !== 0) {
          j = lps[j - 1]
        } else {
          i++
        }
      }
    }
    return rs
  }

  const lps = KMP(s, pattern)
  const reverseString = s.split('').reverse().join('')
  const reverseLps = KMP(reverseString, pattern.split('').reverse().join('')).reverse()

  for (let i = 0; i < lps.length - 1; i++) {
    // length - 1, get first or last
    if (lps[i] === pattern.length - 1) {
      return i - lps[i] + 1
    }

    if (lps[i] === pattern.length) {
      return i - lps[i] + 1
    }

    console.log("🚀 ~ minStartingIndex ~ reverseLps:", reverseLps)
    if (reverseLps[i] === pattern.length - 1 && i > 0) {
      return i - 1
    }
    let j = i + 2;
    while (j > 0 && j < lps.length) {
      if (lps[i] + reverseLps[j] + 1 === pattern.length) {
        return i - lps[i] + 1
      }
      if (j !== reverseLps[reverseLps.length - 1 - j]) {
        j = reverseLps[reverseLps.length - 1 - j]
      } else { j = 0 }
    }
  }
  return -1
};

console.log(minStartingIndex("dcdccdddcdcdddccddccccddcd", "ddc")) // 1
console.log(minStartingIndex("ababbababa", "bacaba"))