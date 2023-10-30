/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minIncrementOperations = function (nums, k) {
  let result = 0;
  function findMax(i) {
    let ii = i;
    if (nums[i + 1] > nums[ii]) ii = i + 1;
    if (nums[i + 2] > nums[ii]) ii = i + 2;
    return ii;
  }
  if (nums.length === 3) {
    return Math.max(0, k - Math.max(...nums));
  }
  if (nums.length === 4) {
    if (nums[1] >= k || nums[2] >= k) return 0;
    if (nums[0] >= k && nums[1] >= k) return 0;
    if (nums[0] >= k)
      return Math.max(0, k - Math.max(nums[1], nums[2], nums[3]));
    if (nums[1] >= k)
      return Math.max(0, k - Math.max(nums[1], nums[2], nums[0]));
    return Math.min(k - Math.max(nums[1], nums[2]), k - nums[0] + k - nums[3]);
  }

  for (let i = 0; i < nums.length - 4; i++) {
    let compareValue = nums[i + 2] < k ? k - nums[i + 2] : 0;
    let saveArr = [];
    for (let j = 0; j < 5; j++) {
      saveArr.push(nums[i + j]);
    }
    let internal = 0;
    for (let j = 0; j < 3; j++) {
      let ii = findMax(i + j);
      if (nums[ii] < k) {
        internal += k - nums[ii];
        nums[ii] = k;
      }
    }
    if (internal > compareValue) {
      for (let j = 0; j < 5; j++) {
        nums[i + j] = saveArr[j];
      }
      result += compareValue;
      nums[i + 2] = k;
    } else {
      result += internal;
    }
  }
  console.log(nums);
  return result;
};
console.log(minIncrementOperations([13, 34, 0, 13, 9, 19], 82));
//145
//117
//[ 13, 34, 82, 13, 9, 82 ]
// 13 82 0 82 9 19
