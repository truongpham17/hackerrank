/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const arr = []
  // build first
  let temp = 0;
  for (let i = 0; i < nums.length; i++) {
    temp += nums[i]
    if (i % k === k - 1) {
      arr.push(temp)
      temp = 0
    }
  }

  let max = findMax(arr)
  for (let i = 1; i < k; i++) {
    for (let j = 0; j < arr.length; j++) {
      if ((j + 1) * k + i - 1 >= nums.length) {
        arr.pop();
        break
      }
      arr[j] -= (nums[j * k + i - 1] || 0)
      arr[j] += nums[(j + 1) * k + i - 1] || 0
    }
    if (arr.length > 0) {
      max = Math.max(max, findMax(arr))
    }
  }
  return max
};

function findMax(A) {
  if (A.length === 0) return 0;

  let maxSoFar = A[0];
  let currentMax = A[0];

  for (let i = 1; i < A.length; i++) {
    currentMax = Math.max(A[i], currentMax + A[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}
console.log(maxSubarraySum([1, 2, 3, 4, 5], 2))