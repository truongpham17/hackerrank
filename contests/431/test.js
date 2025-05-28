function findMaxSum(ranges, k) {
  // Convert ranges to sorted array of [start, end, weight]
  ranges.sort((a, b) => a[0] - b[0]); // Sort by start

  let maxSum = 0;
  let currentSum = 0;
  let windowStart = 0; // Sliding window start
  let currentNodes = 0; // Number of nodes in the current window

  // Sliding window over ranges
  for (let i = 0; i < ranges.length; i++) {
    const [start, end, weight] = ranges[i];
    const length = end - start + 1;

    currentSum += length * weight; // Add current range's total weight
    currentNodes += length; // Update total nodes in the window

    // Shrink the window from the left if it exceeds k nodes
    while (currentNodes > k) {
      const [prevStart, prevEnd, prevWeight] = ranges[windowStart];
      const prevLength = prevEnd - prevStart + 1;

      // Determine how many nodes to remove
      const excess = currentNodes - k;
      if (excess >= prevLength) {
        // Remove the entire previous range
        currentSum -= prevLength * prevWeight;
        currentNodes -= prevLength;
        windowStart++;
      } else {
        // Partially remove from the previous range
        currentSum -= excess * prevWeight;
        currentNodes -= excess;
        break; // Window is now valid
      }
    }

    // Update maxSum
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}


console.log(findMaxSum(
  [[8, 10, 1], [1, 3, 2], [5, 6, 4]], 4
))