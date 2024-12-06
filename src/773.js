/**
 * @param {number[][]} board
 * @return {number}
 */
var slidingPuzzle = function (board) {
  const stateMap = new Map();
  const stateHeap = new MinHeap((a, b) => a[1] > b[1])

  const toId = (board) => {
    let id = ''
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        id += board[i][j]
      }
    }
    return id
  }

  const getEmptyLocation = (stateId) => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        if (stateId[i * 3 + j] === '0') {
          return [i, j]
        }
      }
    }
  }

  const canMove = ([x, y], [dx, dy]) => {
    return x + dx >= 0 && x + dx < 2 && y + dy >= 0 && y + dy < 3
  }

  const move = (stateId, [x, y], [dx, dy]) => {
    const a = x + dx;
    const b = y + dy;
    const grid = stateId.split('')
    const cur = x * 3 + y;
    const next = a * 3 + b;
    temp = grid[cur]
    grid[cur] = grid[next]
    grid[next] = temp
    return grid.join('')
  }

  let rs = -1

  // have to insert before this
  const findWays = (stateId, prevStep) => {
    if (stateMap.get(stateId) < prevStep) {
      return
    }

    if (stateId === RESULT_STATE) {
      rs = prevStep
      return
    }

    const [x, y] = getEmptyLocation(stateId)

    const step = prevStep + 1

    for (const [dx, dy] of DIRECTION) {
      if (canMove([x, y], [dx, dy])) {
        const newId = move(stateId, [x, y], [dx, dy])
        if (!stateMap.has(newId) || stateMap.get(newId) > step) {
          stateHeap.insert([newId, step])
          stateMap.set(newId, step)
        }
      }
    }
  }

  stateHeap.insert([toId(board), 0])

  while (!stateHeap.isEmpty() && rs === -1) {
    const [stateId, step] = stateHeap.pop();
    findWays(stateId, step)
  }
  return rs
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

const DIRECTION = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0]
]

const RESULT_STATE = '123450'

console.log(slidingPuzzle([[1, 2, 3], [4, 0, 5]]))