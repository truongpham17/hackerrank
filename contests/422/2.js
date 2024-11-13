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
 * @param {number[][]} moveTime
 * @return {number}
 */
var minTimeToReach = function (moveTime) {
  const n = moveTime.length;
  const m = moveTime[0].length;
  const moveValue = {}
  const queue = new MinHeap((a, b) => a[1] === b[1] ? a[2] > b[2] : a[1] > b[1])
  const getValue = (i, j) => {
    const coor = i * 5000 + j
    if (moveValue[coor] === undefined) {
      return 10 ** 12
    }
    return moveValue[coor];
  }
  const setValue = (i, j, value) => {
    const coor = i * 5000 + j
    moveValue[coor] = value
  }

  const DIRECTION = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ]
  let i = 0;
  let j = 0;

  for (const [x, y] of DIRECTION) {
    if (i + x >= 0 && i + x < n && j + y >= 0 && j + y < m) {
      const newValue = Math.max(1, moveTime[i + x][j + y] + 1)
      if (newValue < getValue(i + x, j + y)) {
        queue.insert([[i + x, j + y], newValue, 1])
        setValue(i + x, j + y, newValue)
      }
    }
  }

  while (!queue.isEmpty()) {
    const [[i, j], value, step] = queue.pop();
    const extraValue = step % 2 === 0 ? 1 : 2
    for (const [x, y] of DIRECTION) {
      if (i + x >= 0 && i + x < n && j + y >= 0 && j + y < m) {
        const newValue = Math.max(value + extraValue, moveTime[i + x][j + y] + extraValue)
        if (newValue < getValue(i + x, j + y)) {
          queue.insert([[i + x, j + y], newValue, step + 1])
          setValue(i + x, j + y, newValue)
          if (i + x === n - 1 && j + y === m - 1) {
            return newValue
          }
        }
      }
    }
  }

  return getValue(n - 1, m - 1)
};
console.log(minTimeToReach([[56, 93], [3, 38]]))