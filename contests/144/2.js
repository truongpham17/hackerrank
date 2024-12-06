/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
  const n = 26
  const next = [nextCost[0]]
  for (let i = 1; i < n; i++) {
    next.push(next[next.length - 1] + nextCost[i])
  }

  const nextMap = new Map();

  const getNext = (a, b) => {
    if (nextMap.has(a * 50 + b)) {
      return nextMap.get(a * 50 + b)
    }
    let result = 0
    if (a === b) { result = 0 }
    else if (a < b) {
      result = next[b - 1] - (next[a - 1] || 0)
    } else {
      result = next[n - 1] - getNext(b, a)
    }
    nextMap.set(a * 50 + b, result)
    return result
  }


  const previous = Array(n).fill(0)
  previous[n - 1] = previousCost[n - 1]
  const pMap = new Map();
  for (let j = n - 2; j >= 0; j--) {
    previous[j] = previousCost[j] + previous[j + 1]
  }
  const getPrevious = (a, b) => {
    if (pMap.has(a * 50 + b)) {
      return pMap.get(a * 50 + b)
    }
    let rs = 0;
    if (a === b) {
      rs = 0
    }
    else if (a > b) {
      rs = previous[b + 1] - (previous[a + 1] || 0)
    } else {
      rs = previous[0] - getPrevious(b, a)
    }
    pMap.set(a * 50 + b, rs)
    return rs
  }
  let rs = 0;
  for (let i = 0; i < s.length; i++) {
    const a = s[i].charCodeAt(0) - 97;
    const b = t[i].charCodeAt(0) - 97;
    rs += Math.min(getNext(a, b), getPrevious(a, b))
  }
  return rs
};

console.log(shiftDistance(
  "abab",
  "baba",
  [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
))
console.log(shiftDistance(
  "leet",
  "code",
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
))

console.log(shiftDistance(
  "a",
  "z",
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1000, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
))

console.log(shiftDistance(
  "ccdbbcaadb",
  "aadbbdaaac",
  [6, 6, 9, 8, 2, 4, 10, 10, 6, 4, 9, 5, 5, 5, 2, 7, 9, 7, 4, 1, 4, 10, 1, 5, 2, 4],
  [0, 4, 5, 6, 7, 10, 5, 5, 8, 1, 1, 10, 7, 8, 10, 8, 7, 2, 3, 3, 6, 3, 0, 6, 4, 0]
))