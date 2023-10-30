// source: https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/

/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
function sumFromAToB(a, b) {
  return ((a + b) * (a - b + 1)) / 2;
}
function rightSum(n, k, v) {
  if (n - v - k >= 0) {
    return sumFromAToB(v - 1, 1) + n - v - k;
  }
  return sumFromAToB(v - 1, v - (n - 1 - k));
}
function leftSum(n, k, v) {
  if (k - v + 1 >= 0) return sumFromAToB(v - 1, 1) + k - v + 1;
  return sumFromAToB(v - 1, v - k);
}
function total(n, k, v) {
  return v + rightSum(n, k, v) + leftSum(n, k, v);
}
var maxValue = function (n, index, maxSum) {
  let start = Math.floor(maxSum / n);
  let end = Math.ceil(maxSum / (n - 1));
  while (start < end) {
    const middle = Math.floor((start + end) / 2);
    if (total(n, index, middle) > maxSum) {
      end = middle;
    } else {
      start = middle;
    }
    if (start === end || start + 1 === end) return start;
  }
};

console.log(maxValue(3, 0, 815094800)); // 271698265, 271698267, 815094795
