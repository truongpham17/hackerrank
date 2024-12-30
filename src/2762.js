/**
 * @param {number[]} nums
 * @return {number}
 */
var continuousSubarrays = function (nums) {
  const arr = []
  let count = 0;

  // try to move r to the right
  const moveRight = (l, r) => {
    if (r >= nums.length) {
      // from nums.legnth -1 to l
      const range = nums.length - l
      count += range * (range + 1) / 2
      return
    }
    const v = nums[r]
    const index = arr.findIndex(i => i[0] === v)
    if (index === -1) {
      arr.push([v, 1])
      if (!isGood(arr)) {
        moveLeft(l, r)
      } else {
        moveRight(l, r + 1)
      }
    } else {
      arr[index][1]++
      moveRight(l, r + 1)
    }
  }

  const moveLeft = (l, r) => {
    // from l to r-1
    const range = r - l
    count += range * (range + 1) / 2

    while (!isGood(arr)) {
      const v = nums[l]
      const index = arr.findIndex(i => i[0] === v)
      arr[index][1]--
      if (arr[index][1] === 0) {
        arr.splice(index, 1)
      }
      l++
    }
    // from r-1 to l
    count -= (r - l) * (r - l + 1) / 2
    moveRight(l, r + 1)
  }
  moveRight(0, 0)
  return count
};

const isGood = (arr) => {
  if (arr.length <= 1) return true
  const v = arr.map(i => i[0])
  return Math.max(...v) - Math.min(...v) <= 2
}

console.log(continuousSubarrays([5, 4, 2, 4]))