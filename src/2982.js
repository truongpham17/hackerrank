/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function (s) {
  const isMatch = (startIndex, str) => {
    const lbs = []

  }
};

const KMP = (str, pat) => {
  const buildLps = (pat) => {
    const lbs = Array(pat.length).fill(0)
    let l = 0;
    let i = 1;
    while (i < pat.length) {
      if (pat[i] === pat[l]) {
        l++
        lbs[i] = l;
        i++
      } else {
        if (l > 0) {
          l = pat[l - 1]
        } else {
          i++
        }
      }
    }
    return lbs
  }

  let i = 0;
  let j = 0;
  const rs = []
  const lbs = buildLps(pat)
  while (str.length - i >= pat.length - j) {
    if (str[i] === pat[j]) {
      i++;
      j++;
      if (j === pat.length) {
        rs.push(i - j);
        j = lbs[j - 1]
      }
    } else {
      if (j > 0) {
        j = lbs[j - 1]
      } else {
        i++
      }
    }
  }
  return rs
}
console.log(KMP('sadforsadxxxsad', 'sad'))