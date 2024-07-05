/**
 * @param {number} red
 * @param {number} blue
 * @return {number}
 */
var maxHeightOfTriangle = function (red, blue) {
  let cur = 0;
  // red first ,blue after
  let newRed = red;
  let newBlue = blue;
  while (newRed >= 0 && newBlue >= 0) {
    cur++;
    if (cur % 2 === 1) {
      newRed -= cur;
    } else {
      newBlue -= cur
    }
  }
  let result = cur - 1;

  cur = 0;
  // red first ,blue after
  newRed = red;
  newBlue = blue;
  while (newRed >= 0 && newBlue >= 0) {
    cur++
    if (cur % 2 === 0) {
      newRed -= cur;
    } else {
      newBlue -= cur
    }
  }
  result = Math.max(result, cur - 1)
  return result
};
console.log(maxHeightOfTriangle(2, 4))