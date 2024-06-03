class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (parent[0] <= element[0]) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(index) {
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    let smallest = index;
    const length = this.heap.length;

    if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
      smallest = left;
    }
    if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
      smallest = right;
    }
    if (smallest !== index) {
      let temp = this.heap[smallest];
      this.heap[smallest] = this.heap[index];
      this.heap[index] = temp;
      this.sinkDown(smallest);
    }
  }
}


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean[]}
 */
var findAnswer = function (n, edges) {
  const adjList = new Array(n).fill(null).map(() => []);

  edges.forEach(edge => {
    const [a, b, weight] = edge;
    adjList[a].push([b, weight]);
    adjList[b].push([a, weight]);
  });

  const distances = new Array(n).fill(Infinity);
  const minHeap = new MinHeap();
  minHeap.insert([0, 0]); // [distance, node]
  distances[0] = 0;

  const parents = new Map()
  const alreadyCheckedNode = new Set();

  while (minHeap.heap.length > 0) {
    const [dist, u] = minHeap.extractMin();
    if (alreadyCheckedNode.has(u) && distances[u] > dist) {
      continue
    }
    alreadyCheckedNode.add(u)

    adjList[u].forEach(([v, weight]) => {
      let distThroughU = dist + weight;
      if (distThroughU < distances[v]) {
        distances[v] = distThroughU;
        parents.set(v, [u])
        // parents.get(v).push(u)
        minHeap.insert([distThroughU, v]);
      } else if (distThroughU === distances[v]) {
        if (!parents.has(v)) {
          parents.set(v, [])
        }

        parents.get(v).push(u)
      }
    });
  }

  const canReachNode = (i) =>{
  }

  console.log(parents)
  const result = []
  for (const [a, b] of edges) {
    result.push((parents.has(a) && parents.get(a).includes(b)) || (parents.has(b) && parents.get(b).includes(a)))

  }

  return result
}
console.log(findAnswer(4, [[2, 0, 1], [0, 1, 1], [0, 3, 4], [3, 2, 2]]))