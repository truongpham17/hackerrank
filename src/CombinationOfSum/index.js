// https://leetcode.com/problems/combination-sum-ii/
// MEDIUM
// TAGS: Recursion, backtracking
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const newArr = candidates.filter(i => i <= target).sort((a, b) => a - b)
  const list = []
  const backtrack = (current, start, remaining) => {
    if (remaining < 0) return

    if (remaining === 0) {
      list.push([...current])
      return
    }

    for (let i = start; i < newArr.length; i++) {
      if (i > start && newArr[i] === newArr[i - 1]) {
        continue
      }

      current.push(newArr[i])
      backtrack(current, i + 1, remaining - newArr[i])
      current.length = current.length - 1
    }
  }

  backtrack([], 0, target)
  return list
};
console.log(combinationSum2([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 33, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 44, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 49, 5, 5, 5, 5, 6, 6, 6, 6], 29))