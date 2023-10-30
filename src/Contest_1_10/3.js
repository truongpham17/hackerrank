/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minSizeSubarray = function (nums, target) {
  const originalLength = nums.length;
  nums.push(...nums);
  const sums = [nums[0]];
  let total = nums[0];
  for (let i = 1; i < nums.length; i++) {
    sums.push(sums[sums.length - 1] + nums[i]);
    if (i === originalLength - 1) {
      total = sums[sums.length - 1];
    }
  }

  const kTarget = target % total;
  // console.log(originalLength, nums[0], kTarget);
  if (originalLength === 1 && kTarget === 0) return target / nums[0];
  let leftIndex = 0;
  let rightIndex = 1;
  let minArr = Number.MAX_SAFE_INTEGER;
  while (rightIndex < nums.length - 1 && leftIndex < nums.length - 1) {
    const mRight = rightIndex;
    const mLeft = leftIndex;
    const sum = sums[mRight] - (mLeft > 0 ? sums[mLeft - 1] : 0);
    // console.log(mRight, mLeft, sum, kTarget);
    if (sum === kTarget) {
      const value =
        mRight - mLeft + 1 + ((target - kTarget) / total) * originalLength;
      // console.log(value, target, kTarget, originalLength);
      if (value < minArr) {
        minArr = value;
      }
    }
    if (sum >= kTarget) {
      leftIndex++;
    } else {
      rightIndex++;
    }
  }
  return minArr < Number.MAX_SAFE_INTEGER ? minArr : -1;
};
console.log(minSizeSubarray([1], 14));
// 8 items
//  7
