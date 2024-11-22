/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var minZeroArray = function (nums, queries) {
  let isGood = true;
  for (const num of nums) {
    if (num !== 0) {
      isGood = false;
      break
    }
  }
  if (isGood) return 0
  const segmentTree = new SegmentTree(nums)
  for (let i = 0; i < queries.length; i++) {
    const [a, b, c] = queries[i]
    segmentTree.rangeRemove(a, b, c)
    if (segmentTree.areAllZero()) {
      return i + 1
    }
  }
  return -1
};
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;
      this.build(arr, leftChild, start, mid);
      this.build(arr, rightChild, mid + 1, end);
      this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
    }
  }

  applyLazy(node, start, end) {
    if (this.lazy[node] !== 0) {
      const reduction = Math.min(this.lazy[node], this.tree[node]); // Reduce node value
      this.tree[node] -= reduction;
      if (start !== end) {
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        this.lazy[leftChild] += reduction;
        this.lazy[rightChild] += reduction;
      }
      this.lazy[node] = 0; // Reset lazy for this node
    }
  }

  rangeUpdate(left, right, delta, node = 0, start = 0, end = this.n - 1) {
    this.applyLazy(node, start, end);

    if (start > end || start > right || end < left) return;

    if (start >= left && end <= right) {
      this.lazy[node] += delta;
      this.applyLazy(node, start, end);
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    this.rangeUpdate(left, right, delta, leftChild, start, mid);
    this.rangeUpdate(left, right, delta, rightChild, mid + 1, end);

    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
  }

  rangeRemove(left, right, delta, node = 0, start = 0, end = this.n - 1) {
    this.applyLazy(node, start, end);

    if (start > end || start > right || end < left) return;

    if (start >= left && end <= right) {
      const reduction = Math.min(delta, this.tree[node]);
      this.tree[node] -= reduction;
      if (start !== end) {
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        this.lazy[leftChild] += reduction;
        this.lazy[rightChild] += reduction;
      }
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    this.rangeRemove(left, right, delta, leftChild, start, mid);
    this.rangeRemove(left, right, delta, rightChild, mid + 1, end);

    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
  }

  areAllZero(node = 0, start = 0, end = this.n - 1) {
    this.applyLazy(node, start, end);

    if (start === end) return this.tree[node] === 0;

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    return (
      this.areAllZero(leftChild, start, mid) &&
      this.areAllZero(rightChild, mid + 1, end)
    );
  }
}



console.log(minZeroArray([2, 0, 2], [[0, 2, 1], [0, 2, 1]]))
console.log(minZeroArray([4, 3, 2, 1], [[1, 3, 2], [0, 2, 1]]))