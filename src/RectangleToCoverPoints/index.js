/**
 * @param {number[][]} points
 * @param {number} w
 * @return {number}
 */
var minRectanglesToCoverPoints = function (points, w) {
  const set = new Set();
  for (const [x] of points) {
    set.add(x)
  }
  const array = [];
  for (const key of set.keys()) {
    array.push(key)
  }
  array.sort((a, b) => a - b)
  let result = 1;
  let cur = 0;
  for (let i = 1; i < array.length; i++) {
    if (array[i] - array[cur] > w) {
      result += 1;
      cur = i
    }
  }
  return result;
};