// https://leetcode.com/problems/finding-mk-average/
// HARD
/**
 * @param {number} m
 * @param {number} k
 */
var MKAverage = function (m, k) {
  class Fenwick {
    tree
    constructor(n) {
      this.tree = Array(n + 1).fill(0)
    }
    update(index, delta) {
      let j = index + 1;
      while (j < this.tree.length) {
        this.tree[j] += delta
        j += j & (-j)
      }
    }
    // [0,x]
    query(x) {
      let sum = 0;
      let j = x + 1;
      while (j > 0) {
        console.log("🚀 ~ Fenwick ~ query ~ j:", j)
        sum += this.tree[j]
        j -= j & (-j)
      }
      return sum
    }
    // [x,y]
    rangeQuery(x, y) {
      console.log("🚀 ~ Fenwick ~ rangeQuery ~ x, y:", x, y)
      return this.query(y) - this.query(x - 1)
    }
  }
  this.fenwick = new Fenwick(m)
  this.m = m
  this.k = k
  this.tempIndex = 0
  this.arr = Array(m).fill(0)
};

/** 
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  console.log('delta', num - this.arr[this.tempIndex])
  this.fenwick.update(this.tempIndex, num - this.arr[this.tempIndex])
  this.arr[this.tempIndex] = num
  this.tempIndex = (this.tempIndex + 1) % this.m
};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  console.log(this.arr)
  return this.fenwick.rangeQuery(this.k, this.m - this.k - 1)
};
// 1 2 3 4 5 6 7

const obj = new MKAverage(6, 2)
for (let i = 0; i < 7; i++) {
  obj.addElement(i + 1)
}
console.log(obj.calculateMKAverage())

/** 
 * Your MKAverage object will be instantiated and called as such:
 * var obj = new MKAverage(m, k)
 * obj.addElement(num)
 * var param_2 = obj.calculateMKAverage()
 */