/**
 * @param {number[]} nums
 * TAG: SEGMENT TREE
 */
var NumArray = function (nums) {
  //build function
  const n = nums.length
  const arr = Array(nums.length * 2).fill(0)
  for (let i = 0; i < n; i++) {
    arr[n + i] = nums[i]
  }
  for (let i = n - 1; i > 0; i--) {
    arr[i] = arr[i * 2] + arr[i * 2 + 1]
  }
  this.arr = arr
  this.n = n
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  let cur = n + index;
  this.arr[cur] = val;
  while (cur > 1) {
    this.arr[cur >> 1] = this.arr[cur] + this.arr[cur ^ 1]
    cur >>= 1
  }
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let nR = right + 1;
  let nL = left;
  let result = 0;
  for (let i = this.n + nL, j = this.n + nR; i < j; i >>= 1, j >>= 1) {
    if (i & 1) result += this.arr[i++]
    if (j & 1) result += this.arr[--j]
  }
  return result
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */