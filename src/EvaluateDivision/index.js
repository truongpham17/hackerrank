// source: https://leetcode.com/problems/evaluate-division/
/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  const graph = new Map(); // key: string, value: Map(key, value);
  const extendedGraph = [];
  const visitedNodes = new Set();

  function dfs(start, end, temp) {
    if (start === end) {
      return temp;
    }
    if (visitedNodes.has(start) || !graph.has(start)) return;
    visitedNodes.add(start);
    if (graph.has(start) && graph.get(start).has(end)) {
      return graph.get(start).get(end) * temp;
    }
    for (const [key, value] of graph.get(start)) {
      if (!visitedNodes.has(key)) {
        const cal = dfs(key, end, temp * value);
        if (cal) {
          setValue(start, end, cal);
          return;
        }
      }
    }
  }

  function canFindNewConnection(start, end) {
    const before = graph.get(start).has(end);
    dfs(start, end, 1);
    visitedNodes.clear();
    const after = graph.get(start).has(end);
    if (!before && after) {
      return true;
    }
    return false;
  }

  function setValue(i, j, v) {
    if (!graph.has(i)) {
      graph.set(i, new Map());
    }
    if (!graph.has(j)) {
      graph.set(j, new Map());
    }
    if (!graph.get(i).has(j)) {
      graph.get(i).set(j, v);
      graph.get(j).set(i, 1 / v);
    }
  }

  // convert graph to single node values
  equations.forEach((nodes, index) => {
    if (nodes[0].length === 1 && nodes[1].length === 1) {
      setValue(nodes[0], nodes[1], values[index]);
    } else {
      extendedGraph.push([nodes[0], nodes[1], values[index]]);
    }
  });

  let isReducable = true;
  while (isReducable === true) {
    isReducable = false;
    extendedGraph.forEach((nodes) => {
      for (let node0 = 0; node0 < nodes[0].length; node0++) {
        for (let node1 = 0; node1 < nodes[1].length; node1++) {
          const a = canFindNewConnection(nodes[0][node0], nodes[1][node1]);
          console.log(a);
          if (a) {
            isReducable = true;
          }
        }
      }
    });
  }

  console.log(graph);
  return queries.map((query) => graph.get(query[0])?.get(query[1]) || -1);
};

console.log(
  calcEquation(
    [
      ['a', 'b'],
      ['b', 'c'],
      ['bc', 'cd'],
    ],
    [1.5, 2.5, 5.0],
    [
      ['a', 'c'],
      ['c', 'b'],
      ['bc', 'cd'],
      ['cd', 'bc'],
    ]
  )
);
