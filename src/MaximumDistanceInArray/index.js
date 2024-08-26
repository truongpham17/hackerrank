// https://leetcode.com/problems/maximum-distance-in-arrays/?envType=daily-question&envId=2024-08-16
// MEDIUM
/**
 * @param {number[][]} arrays
* @return {number}
*/
var maxDistance = function (arrays) {
  let min = arrays[0][0]
  let max = arrays[0][arrays[0].length - 1]
  let result = -1
  for (let i = 1; i < arrays.length; i++) {
    const arr = arrays[i]
    const minV = arr[0]
    const maxV = arr[arr.length - 1]
    if (maxV - min > result) {
      result = maxV - min
    }
    if (max - minV > result) {
      result = max - minV
    }
    max = Math.max(max, maxV)
    min = Math.min(min, minV)
  }
  return result
};
console.log(maxDistance([[1, 5], [3, 4]]))