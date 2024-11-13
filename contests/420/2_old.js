/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
  const toKey = (x, y) => x * 3001 + y
  const dp = {}

  const defaultValue = {}
  for (let i = 97; i <= 122; i++) {
    defaultValue[String.fromCharCode(i)] = 0;
  }
  const count = defaultValue

  for (const c of s) {
    count[c]++
  }

  dp[toKey(0, s.length - 1)] = count
  let rs = 0;

  const check = (obj) => {
    for (const value of Object.values(obj)) {
      if (Number(value) >= k) return true
    }
    return false
  }

  if (!check(count)) return 0
  
  for (let i = 0; i < s.length; i++) {
    for (let j = s.length - 1; j >= i; j--) {
      let startIndex = i > 0 ? i - 1 : i;
      let endIndex = j < s.length - 1 ? j + 1 : j
      const originCount = { ...dp[toKey(startIndex, endIndex)] }
      if (i > 0) {
        originCount[s[i - 1]]--
      }
      if (j < s.length - 1) {
        originCount[s[j + 1]]--
      }

      dp[toKey(i, j)] = originCount
      if (check(originCount)) {
        rs++
      } else {
        break
      }
    }
  }
  return rs
};
console.log(numberOfSubstrings('abacb', 2))