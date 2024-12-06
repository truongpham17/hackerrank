/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
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

  // if tree1 and tree2 have more than 2 nodes
  const distance = [
  ]
  const distance2 = [
  ]
  const bfs = (tree, target, distance) => {
    let countOdd = 0;
    let countEven = 1;
    const queue = new _Queue();
    const visited = new Set();
    queue.add([target, 0])
    visited.add(target)
    distance[target] = 0;
    while (queue.size() > 0) {
      const [node, dis] = queue.take();
      for (const connect of tree[node]) {
        if (!visited.has(connect)) {
          visited.add(connect)
          queue.add([connect, dis + 1])
          distance[connect] = dis + 1
          if ((dis + 1) % 2 === 0) {
            countEven++
          } else {
            countOdd++
          }
        }
      }
    }
    return [countEven, countOdd];
  }
  const [zeroEven, zeroOdd] = bfs(tree1, 0, distance)
  const [zeroEven2, zeroOdd2] = bfs(tree2, 0, distance2)
  const rs = []
  for (let i = 0; i < tree1.length; i++) {
    const disToZero = distance[i]
    let temp = 0;
    if (disToZero % 2 === 0) {
      temp = zeroEven
    } else {
      temp = zeroOdd
    }
    temp += Math.max(zeroEven2, zeroOdd2)
    rs.push(temp)
  }
  return rs
};
console.log(maxTargetNodes([[0, 1], [0, 2], [0, 3], [0, 4]],
  [[0, 1], [1, 2], [2, 3]]))