//MEDIUM
// https://leetcode.com/problems/path-with-maximum-probability/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function (n, edges, succProb, start_node, end_node) {
  const INF = 10 ** 10

  const map = {}
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i]
    const prod = succProb[i]
    if (map[a]) {
      map[a].push([b, 1 / prod])
    } else {
      map[a] = [[b, 1 / prod]]
    }
    if (map[b]) {
      map[b].push([a, 1 / prod])
    } else {
      map[b] = [[a, 1 / prod]]
    }
  }

  const distance = Array(n).fill(INF)
  distance[start_node] = 1

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

    size() {
      return this.heap.length;
    }

    isEmpty() {
      return this.heap.length === 0;
    }

    pop() {
      const minValue = this.heap[0];
      const endValue = this.heap.pop();
      if (!this.isEmpty()) {
        this.heap[0] = endValue;
        this.heapifyDown(0);
      }
      return minValue;
    }
  }
  const track = new MinHeap();
  track.insert([start_node, 1])

  const visited = new Set()
  
  while (!track.isEmpty()) {
    const [node] = track.pop();

    if (node === end_node) {
      return 1 / distance[end_node]
    }

    if (visited.has(node)) {
      continue
    }

    visited.add(node)
    if (!map[node]) continue

    for (const [next, value] of map[node]) {
      if (!visited.has(next) && value * distance[node] < distance[next]) {
        distance[next] = value * distance[node]
        track.insert([next, value * distance[node]])
      }
    }
  }
  return 0
};
console.log(maxProbability(500, [[193, 229], [133, 212], [224, 465]], [0.91, 0.78, 0.64], 4, 364))