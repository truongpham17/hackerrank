// https://leetcode.com/problems/combination-sum/description/
// MEDIUM
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const rs = []
  const backtrack = (curIndex, curValue, arr) => {
    for (let i = curIndex; i < candidates.length; i++) {
      arr.push(candidates[i])
      const newValue = curValue + candidates[i]
      if (newValue === target) {
        rs.push([...arr])
      } else if (newValue < target) {
        backtrack(i, newValue, arr)
      }
      arr.pop()
    }
  }
  backtrack(0, 0, [])
  return rs
};
console.log(combinationSum([2, 3, 5], 8))