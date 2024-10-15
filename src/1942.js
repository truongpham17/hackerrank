/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */
var smallestChair = function (times, targetFriend) {
  const availableChars = new MinHeap();
  const chairWillBeAvailable = new MinHeap((a, b) => a[0] > b[0]);// store time and chair
  let curChair = 0;
  const targetArrivalTime = times[targetFriend][0]
  times.sort((a, b) => a[0] - b[0])
  for (const [start, end] of times) {
    while (!chairWillBeAvailable.isEmpty() && chairWillBeAvailable.peek()[0] <= start) {
      const [_, chairIndex] = chairWillBeAvailable.pop();
      availableChars.insert(chairIndex)
    }

    if (availableChars.isEmpty()) {
      availableChars.insert(curChair++)
    }

    const freeChair = availableChars.pop();
    if (start === targetArrivalTime) {
      return freeChair
    }
    chairWillBeAvailable.insert([end, freeChair])
  }

}; 


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
console.log(smallestChair([[33889, 98676], [80071, 89737], [44118, 52565], [52992, 84310], [78492, 88209], [21695, 67063], [84622, 95452], [98048, 98856], [98411, 99433], [55333, 56548], [65375, 88566], [55011, 62821], [48548, 48656], [87396, 94825], [55273, 81868], [75629, 91467]], 4))