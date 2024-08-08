/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
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
        throw new Error("Heap is empty");
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
        throw new Error("Heap is empty");
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

  let hCount = 0;
  let vCount = 0;

  const hHeap = new MaxHeap();
  const vHeap = new MaxHeap();
  for (const h of horizontalCut) {
    hHeap.insert(h)
  }
  for (const v of verticalCut) {
    vHeap.insert(v)
  }
  let total = 0;
  while (!hHeap.isEmpty() || !vHeap.isEmpty()) {
    let temp = -1;
    if (!hHeap.isEmpty()) {
      temp = hHeap.peek()
    }
    if (!vHeap.isEmpty()) {
      if (temp < vHeap.peek()) {
        total += vHeap.peek() * (hCount + 1)
        vCount++
        vHeap.pop()
      } else {
        total += temp * (vCount + 1)
        hCount++
        hHeap.pop()
      }
    } else {
      total += temp * (vCount + 1)
      hCount++
      hHeap.pop()
    }
  }
  return total

};
console.log(minimumCost(3, 2, [1, 3], [5]))