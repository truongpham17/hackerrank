// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

//MEDIUM
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const partion = (l, r) => {
    const pos = Math.round((l + r) / 2)
    const pivot = nums[pos];
    let pivotLoc = l;
    for (let i = l; i <= r; i++) {
      if (nums[i] > pivot) {
        const temp = nums[i]
        nums[i] = nums[pivotLoc]
        nums[pivotLoc] = temp
        pivotLoc++
      }
    }
    const temp = nums[pivotLoc]
    nums[pivotLoc] = nums[pos]
    nums[pos] = temp
    return pivotLoc;
  }
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const pivot = partion(l, r)
    if (pivot === k - 1) {
      return nums[pivot]
    }
    if (pivot < k - 1) {
      l = pivot + 1
    } else {
      r = pivot - 1
    }
  }
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))