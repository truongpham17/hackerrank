// source: https://leetcode.com/problems/maximize-score-after-n-operations/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
  const l = nums.length;
  const ds = [];

  for (let i = 0; i < l; i++) {
    for (let j = i + 1; j < l; j++) {
      const val = gcd(nums[i], nums[j]);
      if (val > 1) {
        ds.push({ i, j, val });
      }
    }
  }

  let mask = new Array(l).fill(false);
  let tempArr = [];
  let max = 0;
  function findMax() {
    let findable = false;
    for (let i = 0; i < ds.length; i++) {
      if (mask[ds[i].i] || mask[ds[i].j]) continue;
      findable = true;
      mask[ds[i].i] = true;
      mask[ds[i].j] = true;
      tempArr.push(ds[i].val);
      findMax();
      mask[ds[i].i] = false;
      mask[ds[i].j] = false;
      tempArr.pop();
    }
    if (!findable) {
      const diff = l / 2 - tempArr.length;
      const values =
        tempArr.reduce((s, a, index) => s + a * (index + 1 + diff), 0) +
        ((diff + 1) * diff) / 2;
      if (values > max) {
        max = values;
      }
    }
  }
  findMax();
  return max;
};

function gcd(x, y) {
  while (y !== 0) {
    let t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// console.log(maxScore([1, 2]));
