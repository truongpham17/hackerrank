// Difficulty level: EASY
// source: https://leetcode.com/problems/number-of-good-pairs/
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  const map = new Map();
  nums.forEach((num) => {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  });
  let result = 0;
  for (const [key, value] of map) {
    if (value >= 2) {
      result += (value * (value - 1)) / 2;
    }
  }
  return result;
};

console.log(numIdenticalPairs([1, 2, 3, 1, 1, 3]));
