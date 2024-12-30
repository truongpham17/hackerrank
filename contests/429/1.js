/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  const isDistinct = () => {
    const set = new Set()
    for (const num of nums) {
      if (set.has(num)) {
        return false
      }
      set.add(num)
    }
    return true
  }
  let count = 0;
  while (!isDistinct()) {
    nums.splice(0, 3)
    count++
  }
  return count
};