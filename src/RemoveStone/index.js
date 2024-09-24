// https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/?envType=daily-question&envId=2024-08-29
// MEDIUM
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const graph = {};
  const toCoord = (a, b) => a * 100000 + b
  const toXY = coord => [Math.round(coord / 100000), coord % 100000]
  for (const [x, y] of stones) {
    graph[toCoord(x, y)] = []
  }
  const keys = Object.keys(graph)

  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const key1 = keys[i]
      const key2 = keys[j]
      const [x1, y1] = toXY(key1)
      const [x2, y2] = toXY(key2)
      if (x1 === x2) {
        graph[key1].push(key2)
        graph[key2].push(key1)
      }
      if (y1 === y2) {
        graph[key1].push(key2)
        graph[key2].push(key1)
      }
    }
  }

  const track = new Set();

  const dfs = (value) => {
    if (track.has(value)) return
    track.add(value)

    for (const connect of graph[value]) {
      dfs(connect)
    }
  }

  let rs = 0
  for (const key of keys) {
    if (!track.has(key)) {
      dfs(key)
      rs++
    }
  }

  return stones.length - rs
};
console.log(removeStones([[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]]))