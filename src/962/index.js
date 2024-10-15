
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function (nums) {
  let rs = 0
  const map = {}
  const max = Math.max(...nums)
  const segmentTree = new SegmentTree(max + 1)
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    // query range
    const minIndex = segmentTree.rangeQuery(0, num + 1)
    if (minIndex < i) {
      rs = Math.max(rs, i - minIndex)
    }
    if (map[num] === undefined) {
      map[num] = i
      segmentTree.update(num, i)
    }
  }
  return rs
};


class SegmentTree {
  constructor(n) {
    this.tree = {}
    this.n = n
  }

  getNode(node) {
    return this.tree[node] === undefined ? 10 ** 5 : this.tree[node]
  }

  update(x, value) {
    let temp = x + this.n
    this.tree[temp] = value;
    while (temp > 1) {
      this.tree[temp >> 1] = Math.min(this.getNode(temp), this.getNode(temp ^ 1))
      temp >>= 1
    }
  }
  // [l,r]
  rangeQuery(l, r) {
    let min = 10 ** 5
    for (l += this.n, r += this.n; l < r; l >>= 1, r >>= 1) {
      if (l & 1) min = Math.min(this.getNode(l++), min)
      if (r & 1) min = Math.min(this.getNode(--r), min)
    }
    return min
  }
}
console.log(maxWidthRamp([50000, 49999, 49998, 49997, 49996, 49995]))