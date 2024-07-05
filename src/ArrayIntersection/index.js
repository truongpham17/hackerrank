/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)
  let i1 = 0;
  let i2 = 0;
  const intersect = []
  while (i1 < nums1.length && i2 < nums2.length) {
    if (nums1[i1] < nums2[i2]) {
      i1++
    } else if (nums1[i1] > nums2[i2]) {
      i2++
    } else {
      intersect.push(nums1[i1])
      i1++
      i2++
    }
  }
  return intersect
};