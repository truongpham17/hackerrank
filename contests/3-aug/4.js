/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var timeTaken = function (edges) {
  //neighbor, neighbor % 2 === 0 ? distance + 2 : distance + 1
  // Function to perform DFS and return the farthest node and its distance from the start node
  function dfs(graph, start, visited) {
    let stack = [[start, 0, [start]]];
    let farthestNode = start;
    let maxDistance = 0;
    let longestPath = [];

    while (stack.length > 0) {
      let [node, distance, path] = stack.pop();

      if (distance > maxDistance) {
        maxDistance = distance;
        farthestNode = node;
        longestPath = path;
      }

      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push([neighbor, neighbor % 2 === 0 ? distance + 2 : distance + 1, path.concat(neighbor)]);
        }
      }
    }

    return { farthestNode, maxDistance, longestPath };
  }

  function findLongestPath() {
    let visited = new Set();

    // First DFS from an arbitrary node (node 0)
    visited.add(0);
    let firstDFS = dfs(graph, 0, visited);

    // Second DFS from the farthest node found in the first DFS
    visited = new Set();
    visited.add(firstDFS.farthestNode);
    let secondDFS = dfs(graph, firstDFS.farthestNode, visited);
    return secondDFS.longestPath;
  }

  const graph = {};
  for (let [u, v] of edges) {
    if (!graph[u]) graph[u] = [];
    if (!graph[v]) graph[v] = [];
    graph[u].push(v);
    graph[v].push(u);
  }

  const longestPath = findLongestPath(edges)
  const longestSet = new Set(longestPath)
  const connected = {}

  function generatePath(pivot, defaultSet) {
    for (const neighbor of graph[pivot]) {
      if (!defaultSet.has(neighbor)) {
        connected[neighbor] = pivot
        defaultSet.add(neighbor)
        generatePath(neighbor, defaultSet)
      }
    }
  }


  for (const i of longestPath) {
    generatePath(i, longestSet)
  }

  const pathDis = { [longestPath[0]]: 0 }
  for (let i = 1; i < longestPath.length; i++) {
    pathDis[longestPath[i]] = longestPath[i] % 2 === 0 ? pathDis[longestPath[i - 1]] + 2 : pathDis[longestPath[i - 1]] + 1
  }
  console.log("🚀 ~ timeTaken ~ pathDis:", pathDis, longestPath)
  let result = []
  for (let i = 0; i < edges.length + 1; i++) {
    let distance = 0;
    let temp = i
    const set = new Set(longestPath)
    while (!set.has(temp)) {
      distance += temp % 2 === 0 ? 2 : 1
      temp = connected[temp]
    }
    result.push(distance + Math.min(pathDis[temp], pathDis[longestPath[longestPath.length - 1]] - pathDis[temp]))
  }
  return result
};
console.log(timeTaken([[0, 1], [0, 2]]))