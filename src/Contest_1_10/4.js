/**
 * @param {number[]} edges
 * @return {number[]}
 */
var countVisitedNodes = function (edges) {
  const counts = edges.map((i) => -1);
  const updateVisited = (visited, value) => {
    for (const key of visited) {
      counts[key] = value;
    }
  };
  const dfs = (node, visitedCount, visited) => {
    if (counts[node] !== -1) {
      updateVisited(visited, visitedCount + counts[node]);
      return;
    }
    if (visited.has(node)) {
      updateVisited(visited, visitedCount);
      return;
    }
    visited.add(node);
    dfs(edges[node], visitedCount + 1, visited);
  };
  for (let i = 0; i < edges.length; i++) {
    dfs(i, 0, new Set());
  }
  return counts;
};
console.log(countVisitedNodes([1, 2, 0, 0]));
