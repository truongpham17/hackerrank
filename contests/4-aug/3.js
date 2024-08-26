// TAGS: SEGMENT TREE PROPAGATE
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  class SegmentTree {
    constructor(size) {
      this.n = size;
      this.tree = new Array(4 * size).fill(0);
      this.lazy = new Array(4 * size).fill(null);
    }

    build(arr, start, end, node) {
      if (start === end) {
        this.tree[node] = arr[start];
        return;
      }
      const mid = Math.floor((start + end) / 2);
      this.build(arr, start, mid, 2 * node + 1);
      this.build(arr, mid + 1, end, 2 * node + 2);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    updateRange(l, r, val, start = 0, end = this.n - 1, node = 0) {
      this.propagate(start, end, node);

      if (start > end || start > r || end < l) {
        return;
      }

      if (start >= l && end <= r) {
        this.tree[node] = (end - start + 1) * val;
        if (start !== end) {
          this.lazy[2 * node + 1] = val;
          this.lazy[2 * node + 2] = val;
        }
        return;
      }

      const mid = Math.floor((start + end) / 2);
      this.updateRange(l, r, val, start, mid, 2 * node + 1);
      this.updateRange(l, r, val, mid + 1, end, 2 * node + 2);
      this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
    }

    queryRange(l, r, start = 0, end = this.n - 1, node = 0) {
      this.propagate(start, end, node);

      if (start > end || start > r || end < l) {
        return 0;
      }

      if (start >= l && end <= r) {
        return this.tree[node];
      }

      const mid = Math.floor((start + end) / 2);
      const leftQuery = this.queryRange(l, r, start, mid, 2 * node + 1);
      const rightQuery = this.queryRange(l, r, mid + 1, end, 2 * node + 2);
      return leftQuery + rightQuery;
    }

    propagate(start, end, node) {
      if (this.lazy[node] !== null) {
        this.tree[node] = (end - start + 1) * this.lazy[node];
        if (start !== end) {
          this.lazy[2 * node + 1] = this.lazy[node];
          this.lazy[2 * node + 2] = this.lazy[node];
        }
        this.lazy[node] = null;
      }
    }
  }

  const tree = new SegmentTree(n)
  const result = []
  for (const [start, end] of queries) {
    tree.updateRange(start + 1, end - 1, 1)
    result.push(n - 1 - tree.queryRange(0, n - 1))
  }
  return result

};
console.log(shortestDistanceAfterQueries(5, [[2, 4], [0, 2], [0, 4]]))