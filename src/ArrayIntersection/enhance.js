/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const mapA = new Map()
  for (const num of nums1) {
    if (!mapA.has(num)) {
      mapA.set(num, 1)
    } else {
      mapA.set(num, mapA.get(num) + 1)
    }
  }
  const result = []
  for (const num of nums2) {
    if (mapA.has(num)) {
      result.push(num);
      if (mapA.get(num) - 1 > 0) {
        mapA.set(num, mapA.get(num) - 1)
      } else {
        mapA.delete(num)
      }
    }
  }
  return result
};