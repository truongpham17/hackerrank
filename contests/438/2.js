/**
 * @param {number[][]} grid
 * @param {number[]} limits
 * @param {number} k
 * @return {number}
 */
var maxSum = function (grid, limits, k) {
  const countArr = Array(limits.length).fill(0)
  const maxHeap = new MaxHeap((a, b) => a[0] > b[0])
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      maxHeap.insert([grid[i][j], i])
    }
  }
  let count = 0;
  let sum = 0;
  while (count < k) {
    while (true) {
      const peak = maxHeap.pop();
      if (countArr[peak[1]] < limits[peak[1]]) {
        count++;
        sum += peak[0]
        countArr[peak[1]]++
        break;
      }
    }
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
console.log(maxSum([[1, 2], [3, 4]], [1, 2], 2))