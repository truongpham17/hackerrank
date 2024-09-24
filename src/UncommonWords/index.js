/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const map = {}
  const check = (s) => {
    const arr = s.split(' ')
    for (const str of arr) {
      if (map[str]) {
        map[str]++
      } else {
        map[str] = 1
      }
    }
  }
  check(s1)
  check(s2)
  const rs = []
  for(const key of Object.keys(map)) {
    if(map[key]=== 1) {
      rs.push(key)
    }
  }
  return rs
};