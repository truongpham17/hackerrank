//https://leetcode.com/problems/sort-the-jumbled-numbers/
/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
var sortJumbled = function (mapping, nums) {
  const parseValue = (value) => {
    if (value < 10) {
      return mapping[value]
    }
    let newValue = value;
    let result = 0;
    let mul = 0
    while (newValue > 0) {
      result += mapping[newValue % 10] * (10 ** mul)
      mul++
      newValue = Math.floor(newValue / 10)
    }
    return result
  }

  const newMapArr = nums.map((value, index) => [parseValue(value), index])
  return newMapArr.sort(([fValue, fIndex], [nValue, nIndex]) => fValue === nValue ? fIndex - nIndex : fValue - nValue).map(([_, index]) => nums[index])
};

console.log(sortJumbled([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))