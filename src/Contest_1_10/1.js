/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTripletValue = function (nums) {
  const maxLeft = [nums[0]];
  const maxRight = [nums[nums.length - 1]];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > maxLeft[maxLeft.length - 1]) {
      maxLeft.push(nums[i]);
    } else {
      maxLeft.push(maxLeft[maxLeft.length - 1]);
    }
    if (nums[nums.length - 1 - i] > maxRight[maxRight.length - 1]) {
      maxRight.push(nums[nums.length - 1 - i]);
    } else {
      maxRight.push(maxRight[maxRight.length - 1]);
    }
  }
  let max = 0;
  for (let i = 1; i < nums.length - 1; i++) {
    const middle = nums[i];
    const left = maxLeft[i - 1];
    const right = maxRight[nums.length - 1 - i - 1];
    if (max < (left - middle) * right) {
      max = (left - middle) * right;
    }
  }
  return max;
};

console.log(maximumTripletValue([12, 6, 1, 2, 7]));

/**
 * (nums[i] - nums[j]) * nums[k]
 *
 */
