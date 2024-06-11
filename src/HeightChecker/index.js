// https://leetcode.com/problems/height-checker/?envType=daily-question&envId=2024-06-10
// EASY
/**
 * @param {number[]} heights
 * @return {number}
 */
var heightChecker = function (heights) {
  const sortHeight = [...heights].sort((a, b) => a - b)
  let result = 0;
  for (const i in heights) {
    if (sortHeight[i] !== heights[i]) {
      result++;
    }
  }
  return result;
};