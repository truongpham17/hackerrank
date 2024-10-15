/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function (nums, k) {
  const heap = new MaxHeap()
  for (const num of nums) {
    heap.insert(num)
  }
  let sum = 0
  for (let i = 0; i < k; i++) {
    const max = heap.pop();
    sum += max
    heap.insert(Math.ceil(max / 3))
  }
  return sum
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