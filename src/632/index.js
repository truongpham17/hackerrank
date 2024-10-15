/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function (nums) {
  const n = nums.length;
  const mergeNums = []
  for (let i = 0; i < n; i++) {
    const arr = nums[i]
    for (const num of arr) {
      // value, index
      mergeNums.push([num, i])
    }
  }

  mergeNums.sort((a, b) => a[0] - b[0])
  const set = new Map()
  let pivot = -1;
  const rs = [10 ** 6, 10 ** 7]
  for (let i = 0; i < mergeNums.length; i++) {
    if (i > 0) {
      const val = set.get(mergeNums[i - 1][1])
      if (val === 1) {
        set.delete(mergeNums[i - 1][1])
      } else {
        set.set(mergeNums[i - 1][1], val - 1)
      }
    }

    while (set.size < n && pivot < mergeNums.length - 1) {
      pivot++
      if (!set.has(mergeNums[pivot][1])) {
        set.set(mergeNums[pivot][1], 1)
      } else {
        set.set(mergeNums[pivot][1], set.get(mergeNums[pivot][1]) + 1)
      }
    }

    if (set.size === n) {
      const start = mergeNums[i][0]
      const end = mergeNums[pivot][0]
      if (end - start < rs[1] - rs[0]) {
        rs[0] = start;
        rs[1] = end
      }
    }
  }
  return rs
};
console.log(smallestRange([[4, 10, 15, 24, 26], [0, 9, 12, 20], [5, 18, 22, 30]]))
console.log(smallestRange([[1, 2, 3], [1, 2, 3], [1, 2, 3]]))