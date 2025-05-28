/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function (limit, queries) {
  const ballMap = new Map();
  const colorMap = new Map(); // contaning set
  const rs = []

  for (const [ball, color] of queries) {
    if (ballMap.has(ball)) {
      const color = ballMap.get(ball)
      colorMap.get(color).delete(ball)
      if (colorMap.get(color).size === 0) {
        colorMap.delete(color)
      }
    }
    ballMap.set(ball, color)
    if (!colorMap.has(color)) {
      colorMap.set(color, new Set())
    }
    colorMap.get(color).add(ball)
    rs.push(colorMap.size)
  }
  return rs
};
console.log(queryResults(4, [[1, 4], [2, 5], [1, 3], [3, 4]]))