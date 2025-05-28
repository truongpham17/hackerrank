/**
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const prod = nums[i] * nums[j]
      if (!map.has(prod)) {
        map.set(prod, 1)
      } else {
        map.set(prod, map.get(prod) + 1)
      }
    }
  }
  let rs = 0;
  for (const v of map.values()) {
    rs += v * (v - 1) / 2 * 8
  }
  return rs
};

console.log(tupleSameProduct([2, 3, 4, 6]))
console.log(tupleSameProduct([1, 2, 4, 5, 10]))
console.log(tupleSameProduct([2, 3, 4, 6, 8, 12]))