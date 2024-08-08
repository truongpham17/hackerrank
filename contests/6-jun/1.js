/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors) {
  colors.push(colors[0])
  colors.push(colors[1])
  let result = 0;
  let dp = []
  for (let i = 0; i < colors.length - 2; i++) {
    if (colors[i + 1] !== colors[i] && colors[i + 1] !== colors[i + 2]) {
      result++
    }
  }
  return result
};