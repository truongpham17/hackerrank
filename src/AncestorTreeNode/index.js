// https://leetcode.com/problems/kth-ancestor-of-a-tree-node/
// HARD
/**
 * @param {number} n
 * @param {number[]} parent
 */
var TreeAncestor = function (n, parent) {
  this.n = n;


  // find all leaves
  const leaves = new Set(Array.from({ length: n }, (_, i) => i))
  for (const p of parent) {
    leaves.delete(p)
  }

  // build
  const bfs = [...leaves.keys()]
  let cur = 0;
  const visitedNode = new Set();
  while (cur < bfs.length) {
    const nodeParent = parent[bfs[cur]]
    if (nodeParent !== -1 && nodeParent !== undefined) {
      if (!visitedNode.has(nodeParent)) {
        bfs.push(nodeParent)
        visitedNode.add(nodeParent)
      }
    }
    cur++
  }
  this.BFS = bfs

  // Sparse table 
  const logn = Math.ceil(Math.log2(n))
  const st = Array.from({ length: n }, () => Array(logn).fill(0));

  for (let i = 0; i < n; i++) {
    st[i][0] = bfs[i]
  }

  let j = 1;
  while ((1 << j) <= n) {
    let i = 0;
    // L: i, R: i+2^j
    while (i + (1 << j) <= n) {
      st[i][j] = st[i][j - 1]
    }
  }
};

/** 
 * @param {number} node 
 * @param {number} k
 * @return {number}
 */
TreeAncestor.prototype.getKthAncestor = function (node, k) {

};

new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2])

/** 
 * Your TreeAncestor object will be instantiated and called as such:
 * var obj = new TreeAncestor(n, parent)
 * var param_1 = obj.getKthAncestor(node,k)
 * TODO
 */