/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2, k) {
  const tree1 = Array.from({ length: edges1.length + 1 }, () => [])
  const tree2 = Array.from({ length: edges2.length + 1 }, () => [])
  const buildTree = (edges, tree) => {
    for (const [a, b] of edges) {
      tree[a].push(b)
      tree[b].push(a)
    }
  }
  buildTree(edges1, tree1)
  buildTree(edges2, tree2)
  const bfs = (tree, target, k) => {
    if(k===0) return 1;
    if(k === -1) return 0
    let count = 1;
    const queue = new _Queue();
    const visited = new Set();
    queue.add([target, 0])
    visited.add(target)
    while (queue.size() > 0) {
      const [node, dis] = queue.take();
      if (dis + 1 > k) return count;
      for (const connect of tree[node]) {
        if (!visited.has(connect)) {
          visited.add(connect)
          queue.add([connect, dis + 1])
          count++
        }
      }
    }
    return count;
  }
  let maxKMinus = 0
  for (let i = 0; i < tree2.length; i++) {
    maxKMinus = Math.max(maxKMinus, bfs(tree2, i, k - 1))
  }

  const rs = []
  for (let i = 0; i < tree1.length; i++) {
    let temp = bfs(tree1, i, k)
    temp += maxKMinus
    rs.push(temp)
  }
  return rs
};

class _Queue {
  data = [];
  lastIndex = -1;
  firstIndex = 0;

  add(value) {
    this.lastIndex++;
    this.data[this.lastIndex] = value;
  }

  take() {
    if (this.firstIndex <= this.lastIndex) {
      const result = this.data[this.firstIndex];
      this.data[this.firstIndex] = undefined;
      this.firstIndex++;
      if (this.size() === 0) {
        this.firstIndex = 0;
        this.lastIndex = -1;
      }
      return result;
    } else {
      return undefined;
    }
  }

  size() {
    return this.lastIndex - this.firstIndex + 1;
  }

  clear() {
    this.data.length = 0;
    this.lastIndex = -1;
    this.firstIndex = 0;
  }
}
console.log(maxTargetNodes([[0, 1], [0, 2], [2, 3], [2, 4]], [[0, 1], [0, 2], [0, 3], [2, 7], [1, 4], [4, 5], [4, 6]], 1))
