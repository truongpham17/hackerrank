// source: https://leetcode.com/problems/container-with-most-water/
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let start = 0;
  let end = height.length - 1;
  let maxS = 0;
  while (start < end) {
    const s = Math.min(height[start], height[end]) * (end - start);
    if (s > maxS) {
      maxS = s;
    }
    if (height[start] > height[end]) {
      end--;
    } else {
      start++;
    }
  }
  return maxS;
};
