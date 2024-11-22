/**
 * @param {number[]} arr
 * @return {number}
 */
var findLengthOfShortestSubarray = function (arr) {
  const n = arr.length
  let firstBroken = -1;
  let lastBroken = -1;
  for (let i = 1; i < n; i++) {
    if (arr[i] < arr[i - 1]) {
      firstBroken = i - 1
      break
    }
  }
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) {
      lastBroken = i + 1
      break
    }
  }

  if (firstBroken === -1 && lastBroken === -1) return 0;
  if (arr[lastBroken] >= arr[firstBroken]) {
    return lastBroken - firstBroken - 1
  }

  let i = firstBroken;
  let j = n - 1;

  let max = Math.max(firstBroken + 1, n - lastBroken);
  // very good two pointer approach!
  while (i >= 0 && j >= lastBroken) {
    while (j >= lastBroken && arr[j] >= arr[i]) {
      max = Math.max(max, i + 1 + n - j)
      j--
    }
    i--
  }
  return n - max
};