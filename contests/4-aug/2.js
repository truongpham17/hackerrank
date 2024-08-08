/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  //connect: map(i) : v
  const findMin = (connect) => {
    const dp = Array(n);
    dp[0] = 0;
    for (let i = 1; i < n; i++) {
      let min = 10 ** 10
      for (const v of connect.get(i)) {
        min = Math.min(dp[v], min)
      }
      dp[i] = min + 1
    }
    return dp[n - 1]
  }
  const map = new Map();
  map.set(0, [])
  for (let i = 1; i < n; i++) {
    map.set(i, [i - 1])
  }
  const result = []
  for (const [a, b] of queries) {
    map.get(b).push(a)
    result.push(findMin(map))
  }

  return result
};
console.log(shortestDistanceAfterQueries(5, [[2, 4], [0, 2], [0, 4]]))