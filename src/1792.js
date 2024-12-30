/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function (classes, extraStudents) {
  // pass, total
  const getNext = (a) => (a[0] + 1) / (a[1] + 1) - a[0] / a[1]
  const minHeap = new MaxHeap((a, b) => getNext(a) > getNext(b))
  for (const [a, b] of classes) {
    minHeap.insert([a, b])
  }
  for (let i = 0; i < extraStudents; i++) {
    const c = minHeap.pop()
    minHeap.insert([c[0] + 1, c[1] + 1])
  }

  let total = 0;
  for (const [a, b] of minHeap.heap) {
    total += a / b
  }
  return total / classes.length
};

class MaxHeap {
  constructor(compareFunc = (a, b) => a > b) {
    this.heap = [];
    this.compareFunc = compareFunc;
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
    while (this.getParentIndex(index) >= 0 && this.compareFunc(this.heap[index], this.heap[this.getParentIndex(index)])) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  pop() {
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

    if (leftChildIndex < this.heap.length && this.compareFunc(this.heap[leftChildIndex], this.heap[largest])) {
      largest = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.compareFunc(this.heap[rightChildIndex], this.heap[largest])) {
      largest = rightChildIndex;
    }

    if (largest !== index) {
      this.swap(index, largest);
      this.heapifyDown(largest);
    }
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
