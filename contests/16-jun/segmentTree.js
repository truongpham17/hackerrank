class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(this.n * 2);
    for (let i = 0; i < arr.length; i++) {
      this.tree[i + this.n] = arr[i]
    }
    for (let i = n - 1; i > 0; i--) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1]
    }
  }

  updateValue(value, index) {
    let pos = index + this.n;
    this.tree[pos] = value;
    while (pos > 1) {
      this.tree[pos >> 1] = this.tree[i * 2] + this.tree[i * 2 + 1]
      pos >>= 1;
    }
  }

  getSum(left, right) {
    if (left === 0 && right >= this.n) {
      return this.tree[0]
    }
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
}