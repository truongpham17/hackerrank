/**
 * @param {string} coordinate1
 * @param {string} coordinate2
 * @return {boolean}
 */
var checkTwoChessboards = function (coordinate1, coordinate2) {
  const x1 = coordinate1.charCodeAt(0) - 96
  const x2 = Number(coordinate1[1])
  const y1 = coordinate2.charCodeAt(0) - 96
  const y2 = Number(coordinate2[1])
  if (Math.abs(x1 % 2 - x2 % 2) === Math.abs(y1 % 2 - y2 % 2)) {
    return true
  }
  return false
};