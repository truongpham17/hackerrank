
//https://leetcode.com/problems/insert-delete-getrandom-o1/description/?envType=daily-question&envId=2024-06-13
// MEDIUM

var RandomizedSet = function () {
  this.map = new Map();
  this.arr = [];
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.map.has(val)) {
    return false
  }
  this.map.set(val, this.arr.length)
  this.arr.push(val);
  return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (this.map.has(val)) {
    const index = this.map.get(val);

    // remove element
    this.arr[index] = this.arr[this.arr.length - 1];
    // update the pos of the last element
    this.map.set(this.arr[this.arr.length - 1], index)

    this.arr.length = this.arr.length - 1;

    // delete the value from map
    this.map.delete(val)
    return true
  }
  return false
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const size = this.arr.length;
  const rand = Math.floor(Math.random() * size);
  return this.arr[rand]
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 * ["RandomizedSet","insert","insert","remove","insert","remove","getRandom"]
 * [[],[0],[1],[0],[2],[1],[]]
 */
const obj = new RandomizedSet();
console.log(obj.insert(0))
console.log(obj.insert(1))
console.log(obj.remove(0))
console.log(obj.insert(2))
console.log(obj.remove(1))
console.log(obj.getRandom())