//source: https://leetcode.com/problems/minimum-cost-to-make-array-equal/solutions/
/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
  let min = 1000001;
  let max = -1;
  nums.forEach((val) => {
    if (val < min) min = val;
    if (val > max) max = val;
  });
  function getCost(mean) {
    return nums.reduce(
      (total, val, index) => total + Math.abs(mean - val) * cost[index],
      0
    );
  }
  function getMin(start, end) {
    console.log(start, end);

    if (start >= end) {
      return getCost(start);
    }
    if (start + 1 === end) {
      return Math.min(getCost(start), getCost(end));
    }
    const middle = Math.round((start + end) / 2);
    const middleCost = getCost(middle);
    const upperMiddleCost = getCost(middle + 1);
    if (middleCost < upperMiddleCost) {
      return getMin(start, middle);
    }
    return getMin(middle + 1, end);
  }
  return getMin(min, max);
};

console.log(minCost([1, 3, 5, 2], [2, 3, 1, 14]));
