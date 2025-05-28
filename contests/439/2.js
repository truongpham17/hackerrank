/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestPalindromicSubsequence = function (s, k) {
  let count = 0;
  const stepIds = [];
  for (let a = 0; a < s.length; a++) {
    for (let b = 0; b < s.length; b++) {
      const pos = a * 200 + b
      stepIds[pos] = Math.min((s.charCodeAt(a) - s.charCodeAt(b) + 26) % 26, (s.charCodeAt(b) - s.charCodeAt(a) + 26) % 26)
    }
  }
  const getStep = (a, b) => {
    const pos = a * 200 + b;
    return stepIds[pos]
  }

  const map = new Map();
  const toId = (l, r, k) => l * 62500 + r * 250 + k

  const check = (l, r, curK) => {
    const id = toId(l, r, curK)
    if (map.has(id)) {
      return map.get(id)
    }
    count++
    const step = getStep(l, r)

    curK -= step;

    if (curK < 0) return 0;

    let increase = 0;

    if (l !== r) {
      increase = 2
    }

    let iMax = 0;
    for (let ll = l - 1; ll >= 0; ll--) {
      for (let rr = r + 1; rr < s.length; rr++) {
        iMax = Math.max(iMax, check(ll, rr, curK))
      }
    }

    map.set(id, increase + iMax)
    return increase + iMax;
  }
  let max = 1;
  for (let i = 0; i < s.length - 1; i++) {
    max = Math.max(max, check(i, i, k) + 1)
    max = Math.max(max, check(i, i + 1, k))
  }
  console.log(count)
  return max
};
console.log(longestPalindromicSubsequence('fsdafjsadofjdasoifjiowjeoifjwaoifjwoaijfoiwjfoiwjofijwaoi', 26))