// https://leetcode.com/problems/ipo/?envType=daily-question&envId=2024-06-15
// HARD

/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const heap = new MaxHeap();

  let lastIndex = -1;
  let curCapital = w;
  const combined = capital.map((value, index) => ({ capital: value, profit: profits[index] }))

  combined.sort((a, b) => a.capital - b.capital);

  for (let i = 0; i < k; i++) {
    const largestAvaiCapital = findLargestSmallerOrEqualIndex(combined, curCapital, lastIndex + 1);
    if (largestAvaiCapital >= lastIndex + 1) {
      for (let i = lastIndex + 1; i <= largestAvaiCapital; i++) {
        heap.add(combined[i].profit)
      }
      lastIndex = largestAvaiCapital;
    }
    const nextProject = heap.pop();
    if (nextProject === undefined) {
      return curCapital;
    }
    curCapital += nextProject;
  }
  return curCapital;
};

function findLargestSmallerOrEqualIndex(arr, target, initialLeft = 0) {
  let left = initialLeft;
  let right = arr.length - 1;
  let bestIndex = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid].capital <= target) {
      bestIndex = mid;  // Update bestIndex to the current mid if it's a valid candidate
      left = mid + 1;   // Move the left pointer to search the right half for a potentially larger valid candidate
    } else {
      right = mid - 1;  // Move the right pointer to search the left half
    }
  }

  return bestIndex;
}


class MaxHeap {
  heap = [];
  add(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1)
  }

  pop() {
    if (this.heap.length > 0) {
      const max = this.heap[0];
      this.heap[0] = this.heap[this.heap.length - 1];
      this.heap.length = this.heap.length - 1;
      this._bubbleDown(0);
      return max;
    }
    return undefined;
  }

  _bubbleUp(i) {
    if (this.heap[i] > this.heap[this._getParent(i)]) {
      this._swap(i, this._getParent(i));
      this._bubbleUp(this._getParent(i));
    }
  }

  _bubbleDown(i) {
    let temp = i;
    const heap = this.heap;
    const leftNode = this._getLeftChild(i);
    if (leftNode) {
      if (heap[temp] < heap[leftNode]) {
        temp = leftNode
      }
    }
    const rightNode = this._getRightChild(i);
    if (rightNode) {
      if (heap[temp] < heap[rightNode]) {
        temp = rightNode
      }
    }
    if (temp !== i) {
      this._swap(i, temp);
      this._bubbleDown(temp)
    }
  }

  _swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  _getParent(i) {
    return Math.floor((i - 1) / 2)
  }

  _getLeftChild(i) {
    return i * 2 + 1;
  }

  _getRightChild(i) {
    return i * 2 + 2;
  }
}


console.log(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 10]))