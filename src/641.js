/**
 * @param {number} k
 */
var MyCircularDeque = function (k) {
  this.start = 3000;
  this.end = 2999;
  this.maxSize = k
  this.arr = []
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function (value) {
  if (!this.isFull()) {
    this.start--
    this.arr[this.start] = value
    return true
  } else {
    return false
  }
};

/** 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function (value) {
  if (!this.isFull()) {
    this.end++
    this.arr[this.end] = value
    return true
  }
  return false
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function () {
  if (!this.isEmpty()) {
    this.arr[this.start] = undefined
    this.start++
    return true
  }
  return false
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function () {
  if (!this.isEmpty()) {
    this.arr[this.end] = undefined
    this.end--
    return true
  }
  return false
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function () {
  if(!this.isEmpty()) {
    return this.arr[this.start]
  }
  return -1
};

/**
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function () {
  if(!this.isEmpty()) {
    return this.arr[this.end]
  }
  return -1
};
MyCircularDeque.prototype.size = function () {
  return this.end - this.start + 1
};



/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function () {
  return this.size() === 0
};

/**
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function () {
  return this.size() === this.maxSize
};

/** 
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */