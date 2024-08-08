// TAGS: Floy Warshall
// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/submissions/1332887371/
// MEDIUM

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const INF = 10 ** 10
  const dis = Array.from({ length: n }, () => Array(n).fill(INF))
  for (const [from, to, weight] of edges) {
    dis[from][to] = weight
    dis[to][from] = weight
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dis[i][k] !== INF && dis[k][j] !== INF && dis[i][j] > dis[i][k] + dis[k][j]) {
          dis[i][j] = dis[i][k] + dis[k][j]
        }
      }
    }
  }


  const result = []
  let minReachableCity = INF;

  for (let index = 0; index < n; index++) {
    let count = 0;
    for (let next = 0; next < n; next++) {
      if (dis[index][next] <= distanceThreshold) {
        if (index !== next) {
          count++
        }
      }
    }

    if (count <= minReachableCity) {
      minReachableCity = count;
      if (count === minReachableCity) {
        result.push(index)
      } else {
        result.length = 0;
        result.push(index)
      }
    }
  }

  return Math.max(...result)
};
console.log(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2))