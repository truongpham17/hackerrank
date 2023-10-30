// Difficulty level: EASY
// source: https://leetcode.com/problems/number-of-good-pairs/
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  nums.sort((a, b) => a - b);
  let result = 0;
  let curValue = 0;
  let count = 0;
  nums.forEach((i) => {
    if (i === curValue) {
      count++;
    } else {
      if (count > 1) {
        result += (count * (count - 1)) / 2;
      }
      curValue = i;
      count = 1;
    }
  });
  if (count > 1) {
    result += (count * (count - 1)) / 2;
  }
  return result;
};

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3]));
