/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  const count = { 'a': 0, 'b': 0, 'c': 0 }
  for (const c of s) {
    count[c]++
  }

  for (const key of Object.keys(count)) {
    count[key] -= k
    if (count[key] < 0) return -1
  }

  let maxRemove = 0;
  let head = 0;
  let tail = 0;
  while (head < s.length) {
    const c = s[head]
    count[c]--
    while (count[c] < 0 && tail <= head) {
      // moving the tail
      count[s[tail]]++
      tail++
    }
    maxRemove = Math.max(maxRemove, head - tail + 1)
    head++
  }
  return s.length - maxRemove
};
console.log(takeCharacters("aaaaabccabbbb", 2))