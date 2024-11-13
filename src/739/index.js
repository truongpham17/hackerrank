/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  // index, val
  const stack = []
  const rs = Array(temperatures.length).fill(0)
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length) {
      const lastEl = stack[stack.length - 1]
      if (lastEl[1] < temperatures[i]) {
        rs[lastEl[0]] = i - lastEl[0]
        stack.pop()
      } else {
        break
      }
    }
    stack.push([i, temperatures[i]])
  }
  return rs
};