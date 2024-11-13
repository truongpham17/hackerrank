/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let rs = 0;
  const maxOr = nums.reduce((sum, cur) => sum | cur, 0)
  // only find value larger than index
  const findMissing = (index, arr, curOr) => {
    if (curOr === maxOr) {
      if (arr.length < nums.length) {
        rs += 2 ** (nums.length - arr.length)
      } else {
        rs += 1
      }
      return // no need to check further
    }

    const diff = (maxOr ^ curOr) & maxOr
    const nextIndexes = []
    for (let i = index + 1; i < nums.length; i++) {
      if (nums[i] & diff) {
        nextIndexes.push(i)
      }
    }

    for (const nextIndex of nextIndexes) {
      let isDuplicate = false
      for (const checkIndex of nextIndexes) {
        if (nextIndex !== checkIndex && nums[checkIndex] > nums[nextIndex] && nums[checkIndex] & nums[nextIndex] === nums[nextIndex]) {
          isDuplicate = true;
          break
        }
      }

      if (!isDuplicate) {
        arr.push(nextIndex)
        findMissing(nextIndex, arr, curOr | nums[nextIndex])
        arr.pop();
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    findMissing(i, [i], nums[i])
  }

  return rs / 2 + 1

};
console.log(countMaxOrSubsets([2, 2, 1, 3]))

//101
//011
// 101 ^ 011 = 110
// 110 -> 100?
//100