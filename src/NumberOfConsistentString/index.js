/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
  const set = new Set()
  for (const c of allowed) {
    set.add(c)
  }
  let rs = 0
  for (const w of words) {
    let isIncorrect = false
    for (const c of w) {
      if (!set.has(c)) {
        isIncorrect = true
        break
      }
    }
    if (!isIncorrect) {
      rs++
    }
  }
  return rs
};