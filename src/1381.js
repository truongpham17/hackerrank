/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.arr = Array(maxSize)
  this.lazyIncrease = Array(maxSize).fill(0)
  this.maxSize = maxSize
  this.size = 0
};

/** 
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.size < this.maxSize) {
    this.arr[this.size++] = x
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  if (this.size === 0) return -1
  const rs = this.arr[this.size - 1] + this.lazyIncrease[this.size - 1]
  this.lazyIncrease[this.size - 2] += this.lazyIncrease[this.size - 1]
  this.lazyIncrease[this.size - 1] = 0
  this.size--
  return rs
};

/** 
 * @param {number} k 
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  this.lazyIncrease[Math.min(k - 1, this.size - 1)] += val
};
