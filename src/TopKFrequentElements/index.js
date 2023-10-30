/**
 * @comments
 * good question to practice map and set
 */

//source: https://leetcode.com/problems/top-k-frequent-elements/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  const map = new Map();
  const countMap = new Map();
  countMap.set(1, new Set());
  let max = 0;

  nums.forEach((val) => {
    let count = 0;
    if (!map.has(val)) {
      count = 1;
      map.set(val, 1);
    } else {
      count = map.get(val) + 1;
      map.set(val, count);
    }
    if (count === 1) {
      countMap.get(1).add(val);
    } else {
      countMap.get(count - 1).delete(val);
      if (!countMap.get(count)) {
        countMap.set(count, new Set());
      }
      countMap.get(count).add(val);
    }
    if (count > max) {
      max = count;
    }
  });

  const result = [];
  for (let i = max; i > 0; i--) {
    if (countMap.has(i)) {
      result.push(...countMap.get(i).values());
    }
    if (result.length === k) return result;
  }
  return result;
};

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
