class Fenwick {
  n = 10 ** 5 + 2
  tree = Array(this.n).fill(0)
  update(index, delta) {
    let j = index + 1
    while (j < this.n) {
      this.tree[j] += delta
      j += j & (-j)
    }
  }
  //[0,x]
  query(x) {
    let sum = 0;
    let j = x + 1
    while (j > 0) {
      sum += this.tree[j]
      j -= j & (-j)
    }
    return sum
  }
}
/**
 * @param {number} m
 * @param {number} k
 */
var MKAverage = function (m, k) {
  this.m = m;
  this.k = k;
  this.arr = Array(m).fill(0)
  this.tempIndex = 0;
  this.addCount = 0;

  this.valueTree = new Fenwick()
  this.countTree = new Fenwick()
};

/** 
 * @param {number} num
 * @return {void}
 */
MKAverage.prototype.addElement = function (num) {
  const previous = this.arr[this.tempIndex]
  this.arr[this.tempIndex] = num
  this.addCount++
  this.valueTree.update(num, num)
  this.countTree.update(num, 1)
  if (this.addCount > this.m) {
    this.valueTree.update(previous, -previous)
    this.countTree.update(previous, -1)
  }
  this.tempIndex = (this.tempIndex + 1) % this.m

};

/**
 * @return {number}
 */
MKAverage.prototype.calculateMKAverage = function () {
  const getMinValueWithSumCount = (sumCount) => {
    let l = 0;
    let r = 10 ** 5 + 1;
    let result = -1
    while (l < r) {
      const mid = (Math.floor((l + r) / 2))
      if (this.countTree.query(mid) < sumCount) {
        l = mid + 1
      } else {
        r = mid
      }
    }
    return l
  }

  if (this.addCount < this.m) {
    return -1
  }
  // m = 6, k = 2 -> 6 - 2 = 4 
  // 0 1 2 3 4 5 => [0..3]
  // 2 = [0..2]
  // [2..3]
  const rangeHigh = getMinValueWithSumCount(this.m - this.k)
  const rangeLow = getMinValueWithSumCount(this.k)
  let ans = this.valueTree.query(rangeHigh) - this.valueTree.query(rangeLow)
  ans += (this.countTree.query(rangeLow) - this.k) * rangeLow
  ans -= (this.countTree.query(rangeHigh) - (this.m - this.k)) * rangeHigh
  return Math.floor(ans / (this.m - 2 * this.k))
};

/** 
 * Your MKAverage object will be instantiated and called as such:
 * var obj = new MKAverage(m, k)
 * obj.addElement(num)
 * var param_2 = obj.calculateMKAverage()
 */
/**
 * what do you have
 * maintain an array to store the values, length m
 * count tree?
 * 
 * 
 * 2 3 4 5 6 7
 * 
 */

const obj = new MKAverage(6, 1)
//,[3],[1],[12],[5],[3],[4]
const arr = [3, 1, 12, 5, 3, 4]
for (const x of arr) {
  obj.addElement(x)
}
console.log(obj.calculateMKAverage())
