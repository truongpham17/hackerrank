/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} threshold
 * @return {number}
 */
var minMaxWeight = function (n, edges, threshold) {
  // Step 1: Build adjacency lists for the graph and its reverse
  const graph = Array.from({ length: n }, () => []);
  const reverseGraph = Array.from({ length: n }, () => []);

  for (const [u, v] of edges) {
    graph[u].push(v);
    reverseGraph[v].push(u);
  }

  // Step 2: Perform Kosaraju's algorithm to find SCCs
  const visited = Array(n).fill(false);
  const stack = [];

  function dfs1(node) {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) dfs1(neighbor);
    }
    stack.push(node);
  }

  // First pass: Fill stack by finish time
  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs1(i);
  }

  // Second pass: Find SCCs using the reverse graph
  visited.fill(false);
  const sccs = [];
  const sccMap = Array(n).fill(-1);

  function dfs2(node, component) {
    visited[node] = true;
    sccMap[node] = component;
    for (const neighbor of reverseGraph[node]) {
      if (!visited[neighbor]) dfs2(neighbor, component);
    }
  }

  let componentIndex = 0;
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited[node]) {
      dfs2(node, componentIndex);
      componentIndex++;
    }
  }

  // Step 3: Build SCC graph
  const sccGraph = Array.from({ length: componentIndex }, () => new Set());
  const sccEdges = new Set();

  for (const [u, v] of edges) {
    const uScc = sccMap[u];
    const vScc = sccMap[v];
    if (uScc !== vScc) {
      if (!sccEdges.has(`${uScc}-${vScc}`)) {
        sccGraph[uScc].add(vScc);
        sccEdges.add(`${uScc}-${vScc}`);
      }
    }
  }

  // Step 4: Ensure all SCCs are reachable from the SCC containing node 0
  const startScc = sccMap[0];
  const reachableSccs = Array(componentIndex).fill(false);

  function dfsReach(scc) {
    reachableSccs[scc] = true;
    for (const neighbor of sccGraph[scc]) {
      if (!reachableSccs[neighbor]) dfsReach(neighbor);
    }
  }

  dfsReach(startScc);

  if (reachableSccs.includes(false)) {
    return -1; // Not all nodes are reachable from node 0
  }

  // Step 5: Collect necessary edges
  const necessaryEdges = [];
  visited.fill(false);

  function dfsCollectEdges(node) {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        necessaryEdges.push([node, neighbor]);
        dfsCollectEdges(neighbor);
      }
    }
  }

  dfsCollectEdges(0);
  const map = new Map();
  const mapEd = new Map();
  for (const [u, v, w] of mapEd) {
    if (!map.has(u)) {
      map.set(u * 100000 + v, 10 ** 10)
    }
    map.set(u * 100000 + v, Math.min(map.get(u * 100000 + v), w))
  }

  let rs = 0
  for (const [u, v] of edges) {
    if (!map.has(u)) {
      map.set(u, [])
    }
    map.get(u).push(v)
    rs = Math.max(mapEd.get(u * 100000 + v), rs)
    if (map.get(u).length > threshold) {
      return -1
    }
  }
  return rs

};
