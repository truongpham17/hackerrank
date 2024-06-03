/**
 * @param {string} s
 * @return {number}
 */
var minimumChairs = function (s) {
  let chair = 0;
  let maxChair = 0
  for (const c of s) {
    if (c === 'E') {
      chair++
    } else {
      chair--
    }

    if (chair > maxChair) {
      maxChair = chair
    }
  }
  return maxChair
};