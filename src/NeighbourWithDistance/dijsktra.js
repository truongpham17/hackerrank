// TAGS: Dijkstra
// TAGS: Floy Warshall
// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/submissions/1332887371/
// MEDIUM

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function (n, edges, distanceThreshold) {
  const INF = 10 ** 10
  const orgDis = Array.from({ length: n }, () => Array(n).fill(INF))


  class MinHeap {
    constructor() {
      this.heap = [];
    }

    getParentIndex(index) {
      return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
      return 2 * index + 1;
    }

    getRightChildIndex(index) {
      return 2 * index + 2;
    }

    swap(index1, index2) {
      [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(value) {
      this.heap.push(value);
      this.heapifyUp();
    }

    heapifyUp() {
      let index = this.heap.length - 1;
      while (index > 0 && this.heap[this.getParentIndex(index)][1] > this.heap[index][1]) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    heapifyDown(index) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);
      const length = this.heap.length;

      if (leftChild < length && this.heap[leftChild][1] < this.heap[smallest][1]) {
        smallest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild][1] < this.heap[smallest][1]) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(smallest, index);
        this.heapifyDown(smallest);
      }
    }

    peek() {
      if (this.heap.length === 0) {
        throw new Error("Heap is empty!");
      }
      return this.heap[0];
    }

    size() {
      return this.heap.length;
    }

    isEmpty() {
      return this.heap.length === 0;
    }

    pop() {
      if (this.isEmpty()) {
        throw new Error("Heap is empty!");
      }
      const minValue = this.heap[0];
      const endValue = this.heap.pop();
      if (!this.isEmpty()) {
        this.heap[0] = endValue;
        this.heapifyDown(0);
      }
      return minValue;
    }
  }

  const linked = new Map();
  for (let i = 0; i < n; i++) {
    linked.set(i, [])
  }

  for (const [from, to, weight] of edges) {
    orgDis[from][to] = weight
    orgDis[to][from] = weight

    linked.get(from).push(to)
    linked.get(to).push(from)
  }

  const findMinDistance = (from, to) => {
    const visited = new Set()
    visited.add(from)
    const heap = new MinHeap()
    heap.insert([from, 0])
    const dis = Array(n).fill(INF)
    dis[from] = 0

    while (!heap.isEmpty()) {
      const [node, value] = heap.pop();
      visited.add(node)
      for (const link of linked.get(node)) {
        if (!visited.has(link)) {
          if (dis[link] > value + orgDis[node][link]) {
            dis[link] = value + orgDis[node][link]
            if (link === to) {
              return dis[to]
            }
            heap.insert([link, dis[link]])
          }
        }
      }
    }
    return INF
  }

  const result = []
  let minReachableCity = INF;

  for (let index = 0; index < n; index++) {
    let count = 0;
    for (let next = 0; next < n; next++) {
      if (index !== next && findMinDistance(index, next) <= distanceThreshold) {
        if (index !== next) {
          count++
        }
      }
    }

    if (count <= minReachableCity) {
      minReachableCity = count;
      if (count === minReachableCity) {
        result.push(index)
      } else {
        result.length = 0;
        result.push(index)
      }
    }
  }


  const heap = new MinHeap()
  heap.insert([1, 3])
  heap.insert([3, 5])
  heap.insert([0, 1])
  heap.insert([0, 2])

  return Math.max(...result)

}

console.log(findTheCity(5, [[0, 1, 2], [0, 4, 8], [1, 2, 3], [1, 4, 2], [2, 3, 1], [3, 4, 1]], 2))