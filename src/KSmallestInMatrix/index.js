// https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/
// HARD
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (mat, k) {
  let maxHeap = new _MaxHeap();
  for (const v of mat[0]) {
    if (maxHeap.size() === k) {
      if (v < maxHeap.peek()) {
        maxHeap.insert(v)
        maxHeap.pop()
      }
    } else {
      maxHeap.insert(v)

    }
  }
  for (let i = 1; i < mat.length; i++) {
    const data = maxHeap.heap;
    const newMaxHeap = new _MaxHeap();
    for (const heapVal of data) {
      for (const val of mat[i]) {
        if (newMaxHeap.size() === k) {
          if (heapVal + val < newMaxHeap.peek()) {
            newMaxHeap.insert(heapVal + val)
            newMaxHeap.pop()
          }
        } else {
          newMaxHeap.insert(heapVal + val)
        }
      }
    }
    maxHeap = newMaxHeap

  }
  return maxHeap.peek()
};

class _MaxHeap {
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
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}


console.log(kthSmallest([[1, 3, 11], [2, 4, 6]], 5))