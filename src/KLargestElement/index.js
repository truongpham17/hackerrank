/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const heap = [];
  function parent(i) {
    return Math.floor(i / 2);
  }
  function swap(i, j) {
    [heap[i], heap[j]] = [heap[j], heap[i]];
  }

  function addHeap(i) {
    heap.push(i);
    let current = heap.length - 1;
    while (heap[current] < heap[parent(current)]) {
      swap(current, parent(current));
      current = parent(current);
    }
  }

  function popHeap() {
    if (heap.length <= 1) {
      heap.length = 0;
    }
    heap[0] = heap[heap.length - 1];
    heap.length = heap.length - 1;
  }

  function heapify(pos) {
    let swapPos = pos;
    const leftChild = pos * 2;
    const rightChild = pos * 2 + 1;
    const size = heap.length;
    if (leftChild < size && heap[leftChild] < heap[pos]) {
      swapPos = leftChild;
    }
    if (rightChild < size && heap[rightChild] < heap[swapPos]) {
      swapPos = rightChild;
    }
    if (swapPos !== pos) {
      swap(pos, swapPos);
      heapify(swapPos);
    }
  }

  for (let i = 0; i < k; i++) {
    addHeap(nums[i]);
  }
  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap[0]) {
      popHeap();
      heapify(0);
      addHeap(nums[i]);
    }
  }
  return heap[0];
};
//expected: 3
console.log(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5));
