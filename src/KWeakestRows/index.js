// DIFFICULTY LEVEL: EASY
// source: https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/?envType=daily-question&envId=2023-09-18
// min k heap + binary search
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[]}
 */
class MaxKHeap {
  k = 0;
  heap = [];
  constructor(k) {
    this.k = k;
  }

  addHeap({ value, index }) {
    if (this.heap.length < this.k) {
      this._addHeap({ value, index }); // ok
    } else if (this.heap[0].value > value) {
      this._replaceHeadHeap({ value, index });
    }
  }

  getHeap() {
    return this.heap
      .sort((a, b) => a.value - b.value)
      .sort((a, b) => a.index - b.index)
      .map((i) => i.index);
  }

  _addHeap(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }

  _replaceHeadHeap(value) {
    this.heap[0] = value;
    this._bubbleDown(0);
  }

  _bubbleDown(index) {
    let temp = index;
    const leftChild = index * 2 + 1;
    const rightChild = index * 2 + 2;
    if (
      leftChild < this.heap.length &&
      this.heap[leftChild].value > this.heap[index].value
    ) {
      temp = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild].value > this.heap[temp].value
    ) {
      temp = rightChild;
    }

    if (temp !== index) {
      [this.heap[index], this.heap[temp]] = [this.heap[temp], this.heap[index]];
      this._bubbleDown(temp);
    }
  }

  _bubbleUp(index) {
    if (index === 0) return;
    const parent = Math.floor((index - 1) / 2);
    if (this.heap[index].value > this.heap[parent].value) {
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      this._bubbleUp(parent);
    }
  }
}
var kWeakestRows = function (mat, k) {
  const heap = new MaxKHeap(k);
  mat.forEach((row, index) => {
    let power = 0;
    for (const t of row) {
      if (t === 1) {
        power++;
      } else {
        break;
      }
    }
    heap.addHeap({ value: power, index });
  });

  return heap.getHeap();
};

console.log(
  kWeakestRows(
    [
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1],
    ],
    3
  )
);
// expected 2, 0, 3
