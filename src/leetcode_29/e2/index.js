/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minSum = function (nums1, nums2) {
  let zero_1 = 0;
  let zero_2 = 0;
  let sum_1 = 0;
  let sum_2 = 0;
  for (const i of nums1) {
    if (i === 0) zero_1++;
    sum_1 += i;
  }
  for (const i of nums2) {
    if (i === 0) zero_2++;
    sum_2 += i;
  }
  if (zero_1 > 0 && zero_2 > 0) {
    return Math.max(sum_1 + zero_1, sum_2 + zero_2);
  }
  if (zero_1 === 0 && zero_2 === 0) {
    return sum_1 === sum_2 ? sum_1 : -1;
  }
  if (zero_1 === 0) {
    if (sum_1 >= sum_2 + zero_2) {
      return sum_1;
    } else {
      return -1;
    }
  }
  if (zero_2 === 0) {
    if (sum_2 >= sum_1 + zero_1) {
      return sum_2;
    } else {
      return -1;
    }
  }
};

console.log(
  minSum(
    [0, 16, 28, 12, 10, 15, 25, 24, 6, 0, 0],
    [20, 15, 19, 5, 6, 29, 25, 8, 12]
  )
);
