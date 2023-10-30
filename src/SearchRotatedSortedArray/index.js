/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let pivot = -1;
  function findPivot(start, end) {
    if (pivot !== -1) return;

    const middle = Math.floor((start + end) / 2);
    if (nums[middle] > nums[middle + 1]) {
      pivot = middle + 1;
      return;
    }
    if (middle > start) {
      findPivot(start, middle);
    }
    if (middle + 1 < end) {
      findPivot(middle + 1, end);
    }
  }
  findPivot(0, nums.length - 1);

  let result = -1;

  function findValue(start, end) {
    if (result !== -1) return;
    if (start > end) return;
    const middle = Math.floor((start + end) / 2);
    if (nums[middle] === target) {
      result = middle;
      return;
    }
    if (nums[middle] < target) {
      findValue(middle + 1, end, target);
    } else {
      findValue(start, middle - 1, target);
    }
  }
  if (pivot !== -1) {
    if (nums[nums.length - 1] >= target) {
      findValue(pivot, nums.length - 1);
    } else {
      findValue(0, pivot - 1);
    }
  } else {
    findValue(0, nums.length - 1);
  }

  return result !== -1;
};

console.log(search([3, 1], 1));
