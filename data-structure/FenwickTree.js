class FenwickTree {
  tree
  constructor(arr) {
    this.tree = Array.from({ length: arr.length + 1 }, (_, k) => arr[k - 1])
    this.buildTree()
  }

  buildTree() {
    for (let i = 1; i < this.tree.length; i++) {
      if (i + (i & (-i)) < this.tree.length) {
        this.tree[i + (i & (-i))] += this.tree[i]
      }
    }
  }

  update(index, addValue) {
    let j = index + 1;
    while (j < this.tree.length) {
      this.tree[j] += addValue;
      j += j & (-j)
    }
  }

  query(x) {
    let j = x + 1;
    let sum = 0;
    while (j > 0) {
      sum += this.tree[j]
      j -= j & (-j)
    }
    return sum
  }

  rangeQuery(x, y) {
    return this.query(y) - this.query(x - 1)
  }
}
