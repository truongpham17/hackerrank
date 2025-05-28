class MinHeap {
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
    while (index > 0 && this.compareFunc(this.heap[this.getParentIndex(index)], this.heap[index])) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  heapifyDown(index) {
    let smallest = index;
    const leftChild = this.getLeftChildIndex(index);
    const rightChild = this.getRightChildIndex(index);
    const length = this.heap.length;

    if (leftChild < length && this.compareFunc(this.heap[smallest], this.heap[leftChild])) {
      smallest = leftChild;
    }

    if (rightChild < length && this.compareFunc(this.heap[smallest], this.heap[rightChild])) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      this.swap(smallest, index);
      this.heapifyDown(smallest);
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
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  const minHeap = new MinHeap()
  for (const num of nums) {
    minHeap.insert(num)
  }
  let step = 0;
  while (minHeap.peek() < k) {
    const a = minHeap.pop()
    const b = minHeap.pop()
    minHeap.insert(Math.min(a, b) * 2 + Math.max(a, b))
    step++
  }
  return step;
};
