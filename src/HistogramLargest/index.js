// https://leetcode.com/problems/largest-rectangle-in-histogram/
// HARD
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  heights.push(0)
  let maxArea = 0
  const stack = [-1]
  const getHeight = index => {
    if (index === -1) return 0;
    return heights[index]
  }
  for (let i = 0; i < heights.length; i++) {
    if (stack.length === 0 || heights[i] >= getHeight(stack[stack.length - 1])) {
      stack.push(i)
    } else {
      while (stack.length > 0 && getHeight(stack[stack.length - 1]) > heights[i]) {
        const colume = stack.pop();
        const area = getHeight(colume) * (i - 1 - stack[stack.length - 1])
        maxArea = Math.max(maxArea, area)
      }
      stack.push(i)
    }

    
  }
  return maxArea
};
console.log(largestRectangleArea([4,3,1,6],
  [[0,2],[2,3]]))

// 2, 1, 2
// 0, 1, 2