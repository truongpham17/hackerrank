// DIFFICULTY LEVEL: MEDIUM
// source: https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/
/**
 * algorithm:
 *
 */
/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  let rightPivot = nums.length - 1;
  let leftPivot = 0;
  let sumFromRight = 0;
  let sumFromLeft = 0;
  for (let i = nums.length - 1; i >= 0; i--) {
    if (sumFromRight + nums[i] <= x) {
      rightPivot--;
      sumFromRight += nums[i];
    } else {
      break;
    }
  }
  rightPivot++;

  function getResult() {
    return leftPivot + nums.length - rightPivot;
  }

  let result = Number.MAX_SAFE_INTEGER;

  while (
    leftPivot <= rightPivot &&
    rightPivot <= nums.length &&
    sumFromLeft <= x
  ) {
    if (sumFromLeft + sumFromRight > x) {
      sumFromRight -= nums[rightPivot];
      rightPivot++;
    } else if (sumFromLeft + sumFromRight < x) {
      sumFromLeft += nums[leftPivot];
      leftPivot++;
    } else {
      result = Math.min(result, getResult());
      sumFromRight -= nums[rightPivot];
      rightPivot++;
      sumFromLeft += nums[leftPivot];
      leftPivot++;
    }
  }
  return result === Number.MAX_SAFE_INTEGER ? -1 : result;
};
console.log(
  minOperations(
    [
      8828, 9581, 49, 9818, 9974, 9869, 9991, 10000, 10000, 10000, 9999, 9993,
      9904, 8819, 1231, 6309,
    ],
    134365
  )
); // expect 5, 16
