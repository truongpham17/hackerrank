// source: https://leetcode.com/problems/min-cost-to-connect-all-points/?envType=daily-question&envId=2023-09-15
// Difficulty level: MEDIUM
// algorithm: MST, Kruskal Algorithm + Prim
// union-find algorithm to detect cycle (Disjoint Set)
// using priority queue

/**
 * @param {number[][]} points
 * @return {number}
 * points <= 1000
 */
var minCostConnectPoints = function (points) {
  const vertices = [];

  const calculatePoint = (x, y) =>
    Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]);

  const parent = new Array(points.length);

  for (let i = 0; i < points.length; i++) {
    parent[i] = i;
    for (let j = i + 1; j < points.length; j++) {
      vertices.push([i, j, calculatePoint(points[i], points[j])]);
    }
  }

  vertices.sort((a, b) => a[2] - b[2]);

  const rank = new Map();
  let minCost = 0;
  let nodesCount = 1;

  function findParent(index) {
    if (parent[index] === index) {
      return index;
    }

    return (parent[index] = findParent(parent[index]));
  }

  function getRank(u) {
    return rank.get(u) || 1;
  }

  function unionSet(u, v) {
    const uRank = getRank(u);
    const vRank = getRank(v);

    if (uRank < vRank) {
      parent[u] = v;
    } else if (uRank > vRank) {
      parent[v] = u;
    } else {
      parent[u] = v;
      rank.set(v, vRank + 1);
    }
  }

  for (let i = 0; i < vertices.length; i++) {
    if (nodesCount === parent.length) break;

    const [leftNode, rightNode, weight] = vertices[i];

    const v1 = findParent(leftNode);
    const v2 = findParent(rightNode);

    if (findParent(leftNode) === findParent(rightNode)) {
      continue;
    }

    minCost += weight;
    nodesCount++;
    unionSet(v1, v2);
  }

  return minCost;
};

console.log(
  minCostConnectPoints([
    [3, 12],
    [-2, 5],
    [-4, 1],
  ])
);
