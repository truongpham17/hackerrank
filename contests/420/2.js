/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
  const obj = {}
  for (let i = 97; i <= 122; i++) {
    obj[String.fromCharCode(i)] = [];
  }

  let rs = 0;
  for (let i = 0; i < s.length; i++) {
    obj[s[i]].push(i)
    const value = Object.values(obj).filter(i => i.length >= k)
    if (value.length > 0) {
      let max = -1
      for (const v of value) {

        max = Math.max(max, v[v.length - k])
      }
      rs += max + 1
    }
  }
  return rs
};
console.log(numberOfSubstrings('abacb', 2))