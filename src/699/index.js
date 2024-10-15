/**
 * @param {number[][]} positions
 * @return {number[]}
 */
var fallingSquares = function (positions) {
  const rs = []
  let max = 0;
  for (const [pos, size] of positions) {
    max = Math.max(max, pos + size)
  }
  const tree = new SegmentTree(max)
  for (const [pos, size] of positions) {
    const maxInRange = tree.queryMax(pos, pos + size - 1)
    tree.updateRange(pos, pos + size - 1, size + maxInRange)
    const tempMax = tree.queryMax(0, max)
    rs.push(tempMax)
  }
  return rs
};
class SegmentTree {
  constructor(length) {
    this.n = length;
    this.tree = {};  // Use an object (map) to store only non-default values
    this.lazy = {};  // Use an object for lazy propagation as well
  }

  // Helper to access tree node with default of 0 if not present
  getNode(node) {
    return this.tree[node] || 0;
  }

  // Helper to access lazy node with default of null if not present
  getLazy(node) {
    return this.lazy[node] || null;
  }

  // Apply pending updates to this node (if any)
  lazyUpdate(node, start, end) {
    if (this.getLazy(node) !== null) {
      this.tree[node] = this.getLazy(node); // Set all in range to the value
      if (start !== end) {
        // Propagate the "set" update to children
        this.lazy[2 * node + 1] = this.getLazy(node);
        this.lazy[2 * node + 2] = this.getLazy(node);
      }
      this.lazy[node] = null; // Clear the lazy value after applying
    }
  }

  // Update a range [l, r] by setting a value
  updateRange(l, r, value, node = 0, start = 0, end = this.n - 1) {
    this.lazyUpdate(node, start, end); // Apply pending updates first

    // No overlap
    if (start > r || end < l) {
      return;
    }

    // Total overlap
    if (start >= l && end <= r) {
      this.lazy[node] = value;
      this.lazyUpdate(node, start, end);
      return;
    }

    // Partial overlap
    let mid = Math.floor((start + end) / 2);
    this.updateRange(l, r, value, 2 * node + 1, start, mid);
    this.updateRange(l, r, value, 2 * node + 2, mid + 1, end);
    this.tree[node] = Math.max(this.getNode(2 * node + 1), this.getNode(2 * node + 2));
  }

  // Query for the maximum value in range [l, r]
  queryMax(l, r, node = 0, start = 0, end = this.n - 1) {
    this.lazyUpdate(node, start, end); // Apply pending updates first

    // No overlap
    if (start > r || end < l) {
      return -Infinity;
    }

    // Total overlap
    if (start >= l && end <= r) {
      return this.getNode(node);
    }

    // Partial overlap
    let mid = Math.floor((start + end) / 2);
    let leftMax = this.queryMax(l, r, 2 * node + 1, start, mid);
    let rightMax = this.queryMax(l, r, 2 * node + 2, mid + 1, end);
    return Math.max(leftMax, rightMax);
  }
}


const tree = new SegmentTree(10)
tree.updateRange(1, 2, 2)
tree.updateRange(2, 5, 5)
tree.updateRange(6, 6, 1)
console.log(tree.queryMax(0, 10))
// 

// console.log(fallingSquares([[1, 2], [2, 3], [6, 1]]))