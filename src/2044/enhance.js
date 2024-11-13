/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let rs = 0;
  const maxOr = nums.reduce((sum, cur) => sum | cur, 0)
  const find = (index, value) => {
    if (value === maxOr) {
      if (index < nums.length - 1) {
        rs += 2 ** (nums.length - index - 1)
      } else {
        rs += 1
      }
      return
    }

    for (let i = index + 1; i < nums.length; i++) {
      find(i, value | nums[i])
    }
  }
  
  for (let i = 0; i < nums.length; i++) {
    find(i, nums[i])
  }
  return rs

};
console.log(countMaxOrSubsets([3, 1]))

//101
//011
// 101 ^ 011 = 110
// 110 -> 100?
//100
// 0 1 2 3 4
// l = 5, i = 3 -> 5 - 3 - 1