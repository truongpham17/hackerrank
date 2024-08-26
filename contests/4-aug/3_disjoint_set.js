// TAGS: Disjoint set
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  const parents = Array(n).fill(-1)
  let count = 0;

  const findParents = (i) => {
    if (parents[i] === -1) return -1;
    if (parents[i] === i) return i
    const parent = findParents(parents[i])
    parents[i] = parent;
    return parent
  }

  const result = []
  for (const [start, end] of queries) {
    let index = start + 1;
    while (index < end) {
      const parent = findParents(index)
      if (parent === -1) {
        parents[index] = end - 1
        count++
        index++
      } else {
        index = parent + 1
        if (parent <= end - 1) {
          parents[parent] = end - 1
        }
      }
    }
    result.push(n - 1 - count)
  }
  return result;
};

console.log(shortestDistanceAfterQueries(17, [[7, 16], [9, 14], [12, 14]]))