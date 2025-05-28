/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function (s) {
  const endMap = new Map();
  for (let i = s.length - 1; i >= 0; i--) {
    const c = s[i]
    if (!endMap.has(c)) {
      endMap.set(c, i)
    }
  }
  const middleMap = new Map();
  let rs = 0;
  const a = new Set()
  for (let i = 0; i < s.length; i++) {
    const c = s[i]

    for (const key of middleMap.keys()) {
      if (endMap.get(key) === i) {
        rs += middleMap.get(key).size
        console.log(key, middleMap.get(key))
        middleMap.delete(key)
      } else {
        middleMap.get(key).add(c)
      }
    }
    if (!middleMap.has(c)) {
      middleMap.set(c, new Set())
    }
  }
  return rs
};
console.log(countPalindromicSubsequence('aabca'))