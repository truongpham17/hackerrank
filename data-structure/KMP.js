const KMP = (pat, string) => {
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
  let j = 0
  const rs = []

  while (string.length - i >= pat.length - j) {
    if (pat[j] === string[i]) {
      j++
      i++
      if (j === pat.length) {
        rs.push(i - j)
        j = lps[j - 1]
      }
    } else {
      if (j === 0) {
        i++
      } else {
        j = lps[j - 1]
      }
    }
  }
  return rs
}

console.log(KMP("sad", "sadforsad"))

// aacecaaa
// aaacecaa