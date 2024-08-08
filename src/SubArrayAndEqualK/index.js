/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number} //console.log(countSubarrays([1, 0, 10, 10, 4], 4))
 */
var countSubarrays = function (nums, k) {
  function countSubArrayAnd(minValue) {
    let r = -1;
    let l = -1;
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
      if ((nums[i] & minValue) >= minValue) {
        if (l === -1) {
          l = i
        }
        r = i
      } else {
        if (l !== -1) {
          result += (r - l + 1) * (r - l + 2) / 2
        }
        l = -1
        r = -1
      }
    }
    if (l !== -1) {
      result += (r - l + 1) * (r - l + 2) / 2
    }
    return result
  }
  return countSubArrayAnd(k) - countSubArrayAnd(k + 1)
};
console.log(countSubarrays([1, 1, 2], 1))