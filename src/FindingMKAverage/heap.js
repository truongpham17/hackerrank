/**
 * @param {number} m
 * @param {number} k
 */
var MKAverage = function (m, k) {
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
      while (index > 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    heapifyDown(index) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);
      const length = this.heap.length;

      if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
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

  this.m = m;
  this.k = k
  this.minHeap = new MinHeap() // store k max elements
  this.maxHeap = new MaxHeap() // store k min elements
  this.sumMinHeap = 0;
  this.sumMaxHeap = 0;
  this.tempIndex = 0;
  this.mArray = Array(m).fill(0)
  this.sumArray = 0
};

/** 
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  const delta = num - this.mArray[this.tempIndex]
  this.sumArray += delta
  this.mArray[this.tempIndex] = num
  this.tempIndex = (this.tempIndex + 1) % this.m
  if (this.minHeap.size() < this.k) {
    this.minHeap.insert(num)
    this.sumMinHeap += num
  } else {
    if (num > this.minHeap.peek()) {
      this.sumMinHeap -= this.minHeap.pop()
      this.minHeap.insert(num)
      this.sumMinHeap += num
    }
  }
  if (this.maxHeap.size() < this.k) {
    this.maxHeap.insert(num)
    this.sumMaxHeap += num
  } else {
    if (num < this.maxHeap.peek()) {
      this.sumMaxHeap -= this.maxHeap.pop();
      this.maxHeap.insert(num)
      this.sumMaxHeap += num
    }
  }
};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  console.log(this.sumArray, this.minHeap, this.maxHeap, this.mArray)
  return Math.floor((this.sumArray - this.sumMinHeap - this.sumMaxHeap) / (this.m - 2 * this.k))
};

// 2 3 4 5 6 7
const obj = new MKAverage(6, 2)
for (let i = 0; i < 7; i++) {
  obj.addElement(i + 1)
}
console.log(obj.calculateMKAverage())


/** 
 * Your MKAverage object will be instantiated and called as such:
 * var obj = new MKAverage(m, k)
 * obj.addElement(num)
 * var param_2 = obj.calculateMKAverage()
 */