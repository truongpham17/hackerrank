/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  const count = Array(29).fill(0)
  const toIndex = c => c.charCodeAt(0) - 97
  for (const c of s1) {
    count[toIndex(c)]++
  }
  const newCount = Array(29).fill(0)
  let sum = 0;
  for (let i = 0; i < s2.length; i++) {
    // remove i - 1
    if (i - s1.length >= 0) {
      newCount[toIndex(s2[i - s1.length])]--
      if (newCount[toIndex(s2[i - s1.length])] < count[toIndex(s2[i - s1.length])]) {
        sum--
      }
    }
    newCount[toIndex(s2[i])]++
    if (newCount[toIndex(s2[i])] <= count[toIndex(s2[i])]) {
      sum++
    }
    if (sum === s1.length) {
      return true
    }
  }
  return false
};
//2
//0 1 2 3
console.log(checkInclusion("abc", "ccccbbbbaaaa"))