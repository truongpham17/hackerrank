// source: https://leetcode.com/problems/majority-element-ii/
// Difficulty level: MEDIUM
// Algorithm: Boyer-Moore voting algorithm extended version
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
  let number1 = Number.MAX_SAFE_INTEGER;
  let number2 = Number.MAX_SAFE_INTEGER;
  let count1 = 0;
  let count2 = 0;
  nums.forEach((i) => {
    if (i === number1) {
      count1++;
    } else if (i === number2) {
      count2++;
    } else if (count1 === 0) {
      number1 = i;
      count1 = 1;
    } else if (count2 === 0) {
      number2 = i;
      count2++;
    } else {
      count1--;
      count2--;
    }
  });
  count1 = 0;
  count2 = 0;
  nums.forEach((i) => {
    if (i === number1) {
      count1++;
    } else if (i === number2) {
      count2++;
    }
  });
  const result = [];
  if (count1 > nums.length / 3) result.push(number1);
  if (count2 > nums.length / 3) result.push(number2);
  return result;
};

console.log(majorityElement([6, 5, 5]));
