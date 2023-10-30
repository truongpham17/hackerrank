/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKOr = function (nums, k) {
  const kOr = [];
  const max = Math.max(...nums);
  let i = 0;
  while (2 ** i <= max) {
    const number = 2 ** i;
    let internalCount = 0;
    for (let j = 0; j < nums.length; j++) {
      if ((nums[j] & number) > 0) {
        internalCount++;
      }
    }
    if (internalCount >= k) {
      kOr.push(i);
    }
    i++;
  }
  return kOr.reduce((sum, a) => sum + 2 ** a, 0);
};

console.log(findKOr([10, 8, 5, 9, 11, 6, 8], 1));
