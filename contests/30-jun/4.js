
/**
 * KEYWORDS: Tree, longest path in undirected tree, Queue, BFS
 */
/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
  class Queue {
    data = new Map()
    lastIndex = -1
    firstIndex = 0
    add(value) {
      this.lastIndex++
      this.data.set(this.lastIndex, value)
    }
    take() {
      const result = this.data.get(this.firstIndex);
      this.data.delete(this.firstIndex)
      this.firstIndex++
      return result
    }
    size() {
      return this.lastIndex - this.firstIndex + 1;
    }
    clear() {
      this.data.clear()
      this.lastIndex = -1
      this.firstIndex = 0
    }
  }

  const buildGraph = (edges) => {
    const n = edges.length + 1;
    const graph = Array.from({ length: n }, () => [])
    for (const [from, to] of edges) {
      graph[from].push(to);
      graph[to].push(from)
    }
    return graph
  }

  const longestPathInTree = (graph) => {
    if (graph[0].length === 0) return 0
    const visited = new Set();
    const queue = new Queue();
    let maxHeight = 0;
    let tempLastNode = -1

    const BFS = (node, curHeight) => {
      visited.add(node)
      let foundNextNode = false;
      for (const nextNode of graph[node]) {
        if (!visited.has(nextNode)) {
          foundNextNode = true;
          queue.add([nextNode, curHeight + 1])
        }
      }

      if (!foundNextNode) {
        if (curHeight > maxHeight) {
          maxHeight = curHeight
          tempLastNode = node
        }
      }
    }

    queue.add([0, 0])

    while (queue.size() > 0) {
      const [node, curHeight] = queue.take()
      BFS(node, curHeight)
    }

    visited.clear();
    maxHeight = 0;
    queue.clear();
    queue.add([tempLastNode, 0])

    while (queue.size() > 0) {
      const [node, curHeight] = queue.take()
      BFS(node, curHeight)
    }

    return maxHeight;
  }

  const graph1 = buildGraph(edges1)
  const graph2 = buildGraph(edges2)
  const longestPath1 = longestPathInTree(graph1)
  const longestPath2 = longestPathInTree(graph2)

  return Math.max(longestPath1, longestPath2, Math.ceil(longestPath1 / 2) + Math.ceil(longestPath2 / 2) + 1)
};

console.log(minimumDiameterAfterMerge([], []))

