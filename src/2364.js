/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const delta = nums[i] - i
    if (!map.has(delta)) {
      map.set(delta, 1)
    } else {
      map.set(delta, map.get(delta) + 1)
    }
  }
  let rs = 0;
  for (const value of map.values()) {
    rs += value * (value - 1) / 2
  }
  const n = nums.length;
  const totalPairs = n * (n - 1) / 2
  return totalPairs - rs
};
console.log(countBadPairs([4, 1, 3, 3]))