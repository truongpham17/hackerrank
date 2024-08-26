/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
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

    // 1: smaller, 2: larger
    compare(node1, node2) {
      if (node1.val < node2.val) return 1
      if (node1.val > node2.val) return 2
      if (node1.index < node2.index) return 1
      return 2
    }

    heapifyUp() {
      let index = this.heap.length - 1;
      while (index > 0 && this.compare(this.heap[this.getParentIndex(index)], this.heap[index]) === 2) {
        this.swap(this.getParentIndex(index), index);
        index = this.getParentIndex(index);
      }
    }

    heapifyDown(index) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);
      const length = this.heap.length;

      if (leftChild < length && this.compare(this.heap[leftChild], this.heap[smallest]) === 1) {
        smallest = leftChild;
      }

      if (rightChild < length && this.compare(this.heap[rightChild], this.heap[smallest]) === 1) {
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
      const minValue = this.heap[0];
      const endValue = this.heap.pop();
      if (!this.isEmpty()) {
        this.heap[0] = endValue;
        this.heapifyDown(0);
      }
      return minValue;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = Number(nums[i])
  }
  const mod = Number(10 ** 9 + 7)

  const constructSmallK = (nums, k, multiplier) => {
    const minHeap = new MinHeap()
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i]
      minHeap.insert({ val: num, index: i })
    }

    for (let i = 0; i < k; i++) {
      const small = minHeap.pop();
      small.val = (small.val * Number(multiplier))
      minHeap.insert(small)
    }
    for (let i = 0; i < nums.length; i++) {
      nums[minHeap.heap[i].index] = minHeap.heap[i].val % mod
    }
  }
  function modularExponentiation(a, b, c) {
    let result = BigInt(1);
    let base = BigInt(a) % BigInt(c);
    let exponent = BigInt(b);
    let modulus = BigInt(c);

    while (exponent > 0) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = exponent / BigInt(2);
    }

    return Number(result);
  }
  let total = 0;
  let max = Number(-1)
  for (const num of nums) {
    if (num > max) {
      max = num
    }
  }
  const mulCount = []
  for (const num of nums) {
    if (num === max) {
      mulCount.push(Number(1))
    } else {
      if (Number(max) % (Number(num * Number(multiplier))) === 0) {
        mulCount.push(Number(max / Number(num) / Number(multiplier) + Number(1)))
      } else {
        mulCount.push(Math.ceil(Number(max / Number(num) / Number(multiplier))))
      }
    }
    total += Number(mulCount[mulCount.length - 1])
  }
  const y = Math.floor(Number(k / total))
  const smallK = k - y * Number(total)
  for (let i = 0; i < nums.length; i++) {
    const div = modularExponentiation(Number(multiplier), Number(Number(mulCount[i]) * Number(y)), mod) % mod
    nums[i] = Number(((BigInt(nums[i]) % BigInt(mod)) * BigInt(div)) % BigInt(mod))
  }
  constructSmallK(nums, smallK, Number(multiplier))
  return nums.map(i => Number(i))
};
console.log(getFinalState([161209470], 56851412, 39846))