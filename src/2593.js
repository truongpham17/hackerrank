/**
 * @param {number[]} nums
 * @return {number}
 */
var findScore = function (nums) {
  const arr = nums.map((v, i) => [v, i])
  arr.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
  const set = new Set();
  let score = 0;
  for (const [v, i] of arr) {
    if (!set.has(i)) {
      score += v;
      set.add(i - 1)
      set.add(i)
      set.add(i + 1)
    }
  }
  return score;
};