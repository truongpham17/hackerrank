/**
 * @param {number[][]} queries
 * @param {number} k
 * @return {number[]}
 */
var resultsArray = function (queries, k) {
  class MaxHeap {
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
      while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] < this.heap[index]) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    pop() {
      if (this.heap.length === 0) {
        return -1
      }
      const maxValue = this.heap[0];
      const endValue = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = endValue;
        this.heapifyDown(0);
      }
      return maxValue;
    }

    heapifyDown(index) {
      let largest = index;
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largest]) {
        largest = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largest]) {
        largest = rightChildIndex;
      }

      if (largest !== index) {
        this.swap(index, largest);
        this.heapifyDown(largest);
      }
    }

    peek() {
      if (this.heap.length === 0) {
        return -1
      }
      if (this.heap.length < k) {
        return -1
      }
      return this.heap[0];
    }

    size() {
      return this.heap.length;
    }

    isEmpty() {
      return this.heap.length === 0;
    }
  }


  const maxHeap = new MaxHeap();
  const toDistance = ([x, y]) => {
    return Math.abs(x) + Math.abs(y)
  }
  const rs = []

  for (const x of queries) {
    maxHeap.insert(toDistance(x))
    if (maxHeap.size() > k) {
      maxHeap.pop()
    }
    rs.push(maxHeap.peek())
  }

  return rs 

};