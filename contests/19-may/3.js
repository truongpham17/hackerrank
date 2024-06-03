/**
 * @param {number[]} nums
 * @return {number}
 */
var sumDigitDifferences = function (nums) {
  let firstNum = nums[0].toString();
  let result = 0;
  const numStr = nums.map(i => i.toString())
  for (let i = 0; i < firstNum.length; i++) {
    const map = new Map();
    let diff = 0;
    for (const num of numStr) {
      const value = num[i];
      if (map.has(value)) {
        map.set(value, map.get(value) + 1)
      } else {
        map.set(value, 1)
      }

    }
    const keys = [...map.keys()];
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        diff += (map.get(keys[i]) * map.get(keys[j]))
      }
    }
    result += diff
  }
  return result
};
console.log(sumDigitDifferences([50, 28, 48]))