/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumLength = function (nums) {
  let lastOdd = -1;
  let lastEven = -1;
  const result = []
  // odd and even
  for (let i = 0; i < nums.length; i++) {
    //even
    if (nums[i] % 2 === 0) {
      if (lastOdd !== -1) {
        result.push(result[lastOdd] + 1)
      } else {
        result.push(1)
      }
      lastEven = i
    } else {
      if (lastEven !== -1) {
        result.push(result[lastEven] + 1)
      } else {
        result.push(1)
      }
      lastOdd = i
    }
  }
  const maxOddAndEven = Math.max(...result);

  result.length = 0;
  // all even
  lastEven = -1
  lastOdd = -1
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 1) {
      if (lastEven !== -1) {
        result.push(result[lastEven] + 1)
      } else {
        result.push(1)
      }
      lastEven = i
    } else {
      if (lastOdd !== -1) {
        result.push(result[lastOdd] + 1)
      } else {
        result.push(1)
      }
      lastOdd = i
    }
  }
  return Math.max(maxOddAndEven, ...result)
};