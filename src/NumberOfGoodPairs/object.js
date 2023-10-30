// Difficulty level: EASY
// source: https://leetcode.com/problems/number-of-good-pairs/
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  const map = new Map();
  let result = 0;
  nums.forEach((num) => {
    result += map[num] || 0;
    map[num] = (map[num] || 0) + 1;
  });

  return result;
};

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3]));
