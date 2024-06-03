/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const breaks = []
  breaks.push(0)
  for (let i = 0; i < nums.length - 1; i++) {
    if ((nums[i] + nums[i + 1]) % 2 === 0) {
      breaks.push(i + 1)
    }
  }

  function findLargestPosition(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    let result = -1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (arr[mid] <= x) {
        result = mid;  // Found a valid candidate
        low = mid + 1; // Move right to find a larger index
      } else {
        high = mid - 1; // Move left to find a smaller value
      }
    }
    return result; // Returns -1 if no element is less than or equal to x
  }

  const result = []
  breaks.push(10 ** 10)
  for (const [from, to] of queries) {
    const startPos = findLargestPosition(breaks, from);
    const endPos = breaks[startPos + 1] - 1;
    if (startPos <= from && endPos >= to) {
      result.push(true)
    } else {
      result.push(false)
    }
  }
  return result
};
console.log(isArraySpecial([4, 3, 1, 6],
  [[0, 2], [2, 3]]))