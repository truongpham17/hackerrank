// source: https://leetcode.com/problems/find-the-duplicate-number/
// DIFFICULTY LEVEL: MEDIUM
// algorithm: Floyd tortoise and hare
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let turtle = 0;
  let hare = 0;
  while (true) {
    hare = nums[nums[hare]];
    turtle = nums[turtle];
    if (hare === turtle) {
      break;
    }
    if (hare === undefined || turtle === undefined) return -1;
  }
  turtle = 0;
  while (turtle !== hare) {
    turtle = nums[turtle];
    hare = nums[hare];
  }
  return turtle;
};

console.log(findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1]));
