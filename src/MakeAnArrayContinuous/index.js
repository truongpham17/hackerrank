// source: https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/
// Difficulty level: HARD
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const dp = [];
  let offset = 0;
  let max = -1;

  nums.sort((a, b) => a - b);

  function findOffset(pivot) {
    while (
      nums[offset] <= nums[pivot] + nums.length - 1 &&
      offset < nums.length
    ) {
      offset++;
    }
    return offset;
  }

  function findDiff(start, end) {
    if (start === end) return 0;
    let diffCount = 1;
    for (let i = start + 1; i < end; i++) {
      if (nums[i] !== nums[i - 1]) diffCount++;
    }
    return diffCount;
  }

  for (let i = 0; i < nums.length; i++) {
    const start = offset;
    const end = findOffset(i);

    const value =
      (i === 0 ? 0 : dp[i - 1] - (nums[i - 1] === nums[i] ? 0 : 1)) +
      findDiff(start, end);

    dp.push(value);

    if (max < value) {
      max = value;
    }
  }
  return nums.length - max;
};

console.log(minOperations([1, 2, 6, 7, 12]));
