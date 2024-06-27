/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  nums.sort((a, b) => a - b);
  let min = 10 ** 10
  for (let i = 0; i < nums.length / 2; i++) {
    const avg = (nums[i] + nums[nums.length - 1 - i]) / 2
    if (avg < min) {
      min = avg

    }
  }
  return min
};