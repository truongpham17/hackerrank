/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
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

  const segment = new SegmentTree(Array(s.length).fill(0))
  let oneCount = 0
  let result = 0;
  
  const binarySearch = (boundary) => {
    let l = 0;
    let r = boundary;
    let index = -1;
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      if (segment.query(mid, boundary + 1) <= oneCount ** 2) {
        index = mid;
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    if (index !== -1) {
      return boundary - index + 1
    }
    return 0
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      segment.update(i, 1)
    } else {
      oneCount++
      result += binarySearch(i)
    }
  }
  return result
};
console.log(numberOfSubstrings("101101"))