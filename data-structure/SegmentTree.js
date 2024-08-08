class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n);
    this.build(arr);
  }

  // Build the tree
  build(arr) {
    // Insert leaf nodes in tree
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = arr[i];
    }

    // Build the tree by calculating parents
    for (let i = this.n - 1; i > 0; --i) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }

  // Update a value at index
  update(index, value) {
    // Set value at position p
    index += this.n;
    this.tree[index] = value;

    // Move upward and update parents
    for (let i = index; i > 1; i >>= 1) {
      this.tree[i >> 1] = this.tree[i] + this.tree[i ^ 1];
    }
  }

  // Function to get sum of elements in range [l, r)
  query(l, r) {
    if (l === 0 && r >= this.n) {
      return this.tree[0]
    }

    let sum = 0;

    // Loop to find the sum in the range
    for (l += this.n, r += this.n; l < r; l >>= 1, r >>= 1) {
      if (l & 1) sum += this.tree[l++];
      if (r & 1) sum += this.tree[--r];
    }

    return sum;
  }
}

// Usage example
const arr = [1, 2, 3, 4, 5];
const segTree = new SegmentTree(arr);

console.log(segTree.query(0, 5)); // Output: 5 (2 + 3)
// segTree.update(2, 10);
// console.log(segTree.query(1, 3)); // Output: 12 (2 + 10)
