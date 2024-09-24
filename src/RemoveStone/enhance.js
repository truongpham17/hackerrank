// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/?envType=daily-question&envId=2024-08-29
// MEDIUM
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const parent = new Map();
  const union = (a, b) => {
    parent.set(getParent(b), getParent(a))
  }

  const getParent = (a) => {
    if (parent.get(a) === a) return a
    const rs = getParent(parent.get(a))
    parent.set(a, rs)
    return rs
  }

  for (const [a, b] of stones) {
    if (!parent.has(a)) {
      parent.set(a, a)
    }

    if (!parent.has(b + 20000)) {
      parent.set(b + 20000, b + 20000)
    }

    union(a, b + 20000)
  }
  let count = 0
  for (const a of parent.keys()) {
    if (a === getParent(a)) {
      count++
    }
  }
  return stones.length - count
};