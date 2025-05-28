

function findFirstRangeLarger(ranges, k, max) {
  let low = 0;
  let high = max;
  let result = -1; // Default if no range satisfies the condition

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (ranges[mid][1] >= k) {
      result = mid; // Potential result
      high = mid - 1; // Look for earlier ranges
    } else {
      low = mid + 1; // Look for later ranges
    }
  }

  return result;
}

function findLastRangeLower(ranges, k, min) {
  let low = min;
  let high = ranges.length - 1;
  let result = -1; // Default if no range satisfies the condition

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (ranges[mid][0] <= k) {
      result = mid; // Potential result
      low = mid + 1; // Look for earlier ranges
    } else {
      high = mid - 1; // Look for later ranges
    }
  }

  return result;
}

/**
 * @param {number[][]} coins
 * @param {number} k
 * @return {number}
 */
var maximumCoins = function (coins, k) {
  coins.sort((a, b) => a[0] - b[0])
  const maxHeap = new MaxHeap((a, b) => b[2] < a[2]);
  const presum = []
  let temp = 0;

  for (let i = 0; i < coins.length; i++) {
    const [a, b, w] = coins[i]
    maxHeap.insert([a, b, w, i])
    temp += (b - a + 1) * w
    presum.push(temp)
  }



  let rs = 0;
  while (!maxHeap.isEmpty()) {
    const [a, b, w, index] = maxHeap.pop();
    if (b - a + 1 >= k) {
      rs = Math.max(k * w, rs)
    } else {
      const total = (b - a + 1) * w
      rs = Math.max(total, rs)
      // query from left
      const remaining = k - (b - a + 1)
      const leftPivot = Math.max(a - remaining, 1)
      const firstHigher = findFirstRangeLarger(coins, leftPivot, index - 1)
      if (firstHigher !== -1) {
        let sum = presum[index - 1] - (presum[firstHigher - 1] || 0)
        // extra
        const extra = leftPivot - coins[firstHigher][0]
        if (extra > 0) {
          sum -= extra * coins[firstHigher][2]
        }
        rs = Math.max(rs, total + sum)
      }
      const rightPivot = b + remaining
      const lastLower = findLastRangeLower(coins, rightPivot, index + 1)
      if (lastLower !== -1) {
        let sum = presum[lastLower] - presum[index]
        const extra = coins[lastLower][1] - rightPivot
        if (extra > 0) {
          sum -= extra * coins[lastLower][2]
        }
        rs = Math.max(rs, total + sum)
      }
    }
  }

  return rs
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
console.log(maximumCoins(
  [[31, 33, 18], [45, 49, 18], [34, 40, 8], [17, 20, 8], [41, 42, 7], [6, 9, 10], [23, 30, 12], [10, 14, 7]], 16))

// console.log(maximumCoins([[30, 49, 12]], 28))