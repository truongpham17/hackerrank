/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function (nums) {
  const map = new Map();
  const getCount = (num) => {
    let rs = 0;
    while (num > 0) {
      rs += num % 10;
      num = (num - num % 10) / 10;
    }
    return rs
  }
  for (const num of nums) {
    const count = getCount(num);
    if (map.has(count)) {
      const [a, b] = map.get(count);
      const [d, e] = [a, b, num].sort((a, b) => b - a)
      map.set(count, [d, e])
    } else {
      map.set(count, [num, 0])
    }
  }
  let rs = -1
  for (const [a, b] of map.values()) {
    if (a > 0 && b > 0) {
      rs = Math.max(rs, a + b)
    }
  }
  return rs
};
console.log(maximumSum([18, 43, 36, 13, 7]))