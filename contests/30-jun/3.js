/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
  const dp = new Map();
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[i] = nums[i] % k;
    const data = { [nums[i]]: 1 }
    for (let j = 0; j < i; j++) {
      const newDiv = (nums[i] + nums[j]) % k;
      data[newDiv] = Math.max(data[newDiv] || 1, (dp.get(j)[newDiv] + 1) || 2);
      result = Math.max(result, data[newDiv])
    }
    dp.set(i, data)
  }
  return result
};
console.log(maximumLength([1, 4, 2, 3, 1, 4], 3))