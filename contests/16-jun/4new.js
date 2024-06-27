

class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(this.n * 2);
    for (let i = 0; i < arr.length; i++) {
      this.tree[i + this.n] = arr[i]
    }
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1]
    }
  }

  updateValue(index, value) {
    if (this.tree[index + this.n] === value) return;
    let pos = index + this.n;
    this.tree[pos] = value;
    while (pos > 1) {
      this.tree[pos >> 1] = this.tree[pos] + this.tree[pos ^ 1]
      pos >>= 1;
    }
  }

  getSum(left, right) {
    let sum = 0;
    for (let l = left + this.n, r = right + this.n; l < r; l >>= 1, r >>= 1) {
      if (l & 1) {
        sum += this.tree[l++]
      }
      if (r & 1) {
        sum += this.tree[--r]
      }
    }
    return sum;
  }
}/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var countOfPeaks = function (nums, queries) {
  const arr = []
  arr.push(0);
  const isPeak = (i) => {
    return (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) ? 1 : 0
  }

  for (let i = 1; i < nums.length - 1; i++) {
    arr.push(isPeak(i))
  }

  arr.push(0)
  const segmentTree = new SegmentTree(arr);
  const result = [];
  for (const [a, b, c] of queries) {
    if (a === 1) {
      result.push(segmentTree.getSum(b + 1, c))
    } else if (a === 2) {
      const index = b
      const value = c;
      nums[index] = value;
      for (let i = index - 1; i < index + 2; i++) {
        segmentTree.updateValue(i, isPeak(i))
      }
    }
  }
  return result
};

console.log(countOfPeaks([3, 1, 4, 2, 5], [[2, 3, 4], [1, 0, 4]]))