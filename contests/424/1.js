/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
  const n = nums.length;
  const isGood = arr => {
    for (const x of arr) {
      if (x !== 0) return false
    }
    return true
  }
  let count = 0;
  const move = (arr, direction, index) => {
    if (index < 0 || index >= n) {
      if (isGood(arr)) {
        return true
      }
    } else {
      if (arr[index] === 0) {
        return move(arr, direction, index + direction)
      } else {
        arr[index]--
        if (arr[index] < 0) return false
        return move(arr, -direction, index - direction)
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      if (move([...nums], 1, i)) {
        count++
      }
      if (move([...nums], -1, i)) {
        count++
      }
    }

  }
  return count
};
console.log(countValidSelections([1, 0, 2, 0, 3]))
console.log(countValidSelections([2, 3, 4, 0, 4, 1, 0]))
console.log(countValidSelections([0, 1, 0]))