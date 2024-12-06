/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
  const map = {}
  let sum = 0
  for (const num of nums) {
    sum += num
    if (!map[num]) {
      map[num] = 0
    }
    map[num]++
  }
  let rs = -(10 ** 5);
  for (const num of nums) {
    const remain = sum - 2 * num;
    if (map[remain]) {
      if (remain !== num || (map[remain] >= 2)) {
        rs = Math.max(rs, remain)
      }
    }
  }
  return rs;
};
console.log(getLargestOutlier([-2, -1, -3, 7]))