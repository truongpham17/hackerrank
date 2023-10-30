// source: https://leetcode.com/problems/is-graph-bipartite/

/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  const states = new Array(graph.length);
  const heap = [];
  for (let i = 0; i < graph.length; i++) {
    if (states[i] === undefined) {
      states[i] = 1;
      heap.push(i);
      while (heap.length !== 0) {
        const i = heap.pop();
        for (let j = 0; j < graph[i].length; j++) {
          if (states[graph[i][j]] === undefined) {
            states[graph[i][j]] = -states[i];
            heap.push(graph[i][j]);
          } else if (states[graph[i][j]] === states[i]) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

console.log(
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ])
);
