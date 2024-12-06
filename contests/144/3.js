/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var maxRemoval = function (nums, queries) {
  const n = nums.length;
  const step = Array(n + 1).fill(0)
  for (const [start, end] of queries) {
    step[start]++
    step[end + 1]--
  }
  let cur = 0;
  for (let i = 0; i < n; i++) {
    cur += step[i]
    if (cur < nums[i]) return -1
  }

  queries.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])
  console.log("🚀 ~ maxRemoval ~ queries:", queries)
  const segment = new SegmentTree(nums)
  let count = 0
  for (const [a, b] of queries) {
    const maxValue = segment.queryMax(a, b)
    console.log("🚀 ~ maxRemoval ~ maxValue:", maxValue)
    if (maxValue > 0) {
      count++
      segment.decrease(a, b)
    }
  }
  return queries.length - count
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
      this.build(arr, 2 * node + 1, start, mid);
      this.build(arr, 2 * node + 2, mid + 1, end);
      this.tree[node] = Math.max(this.tree[2 * node + 1], this.tree[2 * node + 2]);
    }
  }

  propagate(node, start, end) {
    if (this.lazy[node] !== 0) {
      this.tree[node] -= this.lazy[node];
      if (start !== end) {
        this.lazy[2 * node + 1] += this.lazy[node];
        this.lazy[2 * node + 2] += this.lazy[node];
      }
      this.lazy[node] = 0;
    }
  }

  decrease(a, b, node = 0, start = 0, end = this.n - 1) {
    this.propagate(node, start, end);
    if (start > b || end < a) {
      return;
    }
    if (start >= a && end <= b) {
      this.lazy[node] += 1;
      this.propagate(node, start, end);
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.decrease(a, b, 2 * node + 1, start, mid);
    this.decrease(a, b, 2 * node + 2, mid + 1, end);
    this.tree[node] = Math.max(this.tree[2 * node + 1], this.tree[2 * node + 2]);
  }

  queryMax(a, b, node = 0, start = 0, end = this.n - 1) {
    this.propagate(node, start, end);
    if (start > b || end < a) {
      return -Infinity;
    }
    if (start >= a && end <= b) {
      return this.tree[node];
    }
    const mid = Math.floor((start + end) / 2);
    const leftMax = this.queryMax(a, b, 2 * node + 1, start, mid);
    const rightMax = this.queryMax(a, b, 2 * node + 2, mid + 1, end);
    return Math.max(leftMax, rightMax);
  }
}



console.log(maxRemoval([0, 1, 2], [[1, 2], [1, 2], [0, 0], [1, 1], [1, 1], [0, 1], [2, 2], [2, 2]]))