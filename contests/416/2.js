/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function (mountainHeight, workerTimes) {
  class MinHeap {
    constructor(largerFunc) {
      this.heap = [];
      this.largerFunc = largerFunc
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

    compare(a, b) {
      return a[0] * a[1] * (a[1] + 1) > b[0] * b[1] * (b[1] + 1)
    }

    heapifyUp() {
      let index = this.heap.length - 1;
      while (index > 0 && this.compare(this.heap[this.getParentIndex(index)], this.heap[index])) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    heapifyDown(index) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);
      const length = this.heap.length;

      if (leftChild < length && this.compare(this.heap[smallest], this.heap[leftChild])) {
        smallest = leftChild;
      }

      if (rightChild < length && this.compare(this.heap[smallest], this.heap[rightChild])) {
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
  const minHeap = new MinHeap();
  for (const time of workerTimes) {
    minHeap.insert([time, 1])
  }

  let max = 0;
  for (let i = 0; i < mountainHeight; i++) {
    const [work, count] = minHeap.pop();
    if (max < work * count * (count + 1) / 2) {
      max = work * count * (count + 1) / 2
    }
    minHeap.insert([work, count + 1])
  }
  return max
};
console.log(minNumberOfSeconds(5, [1, 7]))