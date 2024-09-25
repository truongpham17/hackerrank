// 78 MEDIUM
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const rs = []
  const numberToSet = (key) => {
    let value = []
    let index = 0;
    while ((key >> index) > 0) {
      if ((key >> index) & 1) {
        value.push(nums[index])
      }
      index++
    }
    return value
  }
  for(let i = 0; i < 2**(nums.length); i++) {
    rs.push(numberToSet(i))
  }
  return rs
};