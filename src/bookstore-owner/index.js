// https://leetcode.com/problems/grumpy-bookstore-owner/?envType=daily-question&envId=2024-06-21
// MEDIUM
/**
 * @param {number[]} customers
 * @param {number[]} grumpy
 * @param {number} minutes
 * @return {number}
 */
var maxSatisfied = function (customers, grumpy, minutes) {
  let tempSatisfied = 0;
  let totalSatisfied = 0;

  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 0) {
      totalSatisfied += customers[i]
    }
    if (grumpy[i] === 1) {
      tempSatisfied += customers[i]
    }
  }

  let maxGain = tempSatisfied;

  for (let i = minutes; i < grumpy.length; i++) {
    if (grumpy[i] === 0) {
      totalSatisfied += customers[i]
    }
    if (grumpy[i - minutes] === 1) {
      tempSatisfied -= customers[i - minutes]
    }
    if (grumpy[i] === 1) {
      tempSatisfied += customers[i]
    }
    if (tempSatisfied > maxGain) {
      maxGain = tempSatisfied
    }
  }
  return totalSatisfied + maxGain
};

console.log(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3))