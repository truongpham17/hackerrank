// https://leetcode.com/problems/kth-largest-element-in-a-stream/?envType=daily-question&envId=2024-08-12
// EASY
/**
 *  
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k
  this.heap = []
  const peek = () => {
    return this.heap[0]
  }
  const insert = (value) => {
    if (this.heap.length >= this.k) {
      if (this.heap[0] > value) {
        return
      } else {
        this.heap[0] = value;
        heapDown(0)
      }
    } else {
      this.heap.push(value)
      heapUp(this.heap.length - 1)
    }
  }

  const swap = (a, b) => {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
  }
  const heapUp = (index) => {
    let temp = index
    while (temp > 0) {
      const parent = (temp - 1) >> 1
      if (this.heap[parent] > this.heap[temp]) {
        swap(parent, temp)
        temp = parent
      } else {
        break
      }
    }
  }

  const heapDown = (index) => {
    let temp = index
    const leftChild = index * 2 + 1
    const rightChild = index * 2 + 2
    if (this.heap[index] > this.heap[leftChild]) {
      temp = leftChild
    }
    if (this.heap[temp] > this.heap[rightChild]) {
      temp = rightChild
    }
    if (temp !== index) {
      swap(temp, index)
      heapDown(temp)
    }
  }
  this.peek = peek;
  this.insert = insert;
  for (const v of nums) {
    this.insert(v)
  }
};


/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.insert(val)
  return this.peek()
};

const obj = new KthLargest(3, [4, 5, 8, 2])
obj.add(3)
obj.add(5)
obj.add(10)
/** 
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */