// source: https://leetcode.com/problems/design-hashmap/
// Difficulty level: EASY
var MyHashMap = function () {
  this.__map = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  this.__map.set(key, value);
};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  if (this.__map.has(key)) return this.__map.get(key);
  return -1;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  this.__map.delete(key);
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
var obj = new MyHashMap();
obj.put('12', 12);
var param_2 = obj.get(12);
obj.remove('12');
