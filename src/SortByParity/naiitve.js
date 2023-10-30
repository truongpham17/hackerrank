// Difficulty level: EASY
// source: https://leetcode.com/problems/sort-array-by-parity/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
  const odds = [];
  const evens = [];
  nums.forEach((n) => {
    if (n % 2 === 0) evens.push(n);
    else odds.push(n);
  });
  evens.push(...odds);
  return evens;
};

console.log(sortArrayByParity([3, 1, 2, 4, 3, 6]));
