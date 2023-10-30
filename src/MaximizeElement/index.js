function maxElement(n, maxSum, k) {
  const maxPossibleValue = Math.floor(
    (Math.sqrt(maxSum - n) + 1) / Math.min(k, n - 1 - k)
  );

  return maxPossibleValue;
}
