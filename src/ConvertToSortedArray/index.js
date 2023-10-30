// difficulty level: HARD
// source: https://leetcode.com/problems/minimum-replacements-to-sort-the-array/
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumReplacement = function (nums) {
  const arrayRange = [];
  const l = nums.length;

  for (let i = l - 1; i >= 0; i--) {
    arrayRange.push({
      minValue: nums[i],
      maxValue: nums[i],
    });
  }

  let repCount = 0;
  function getChangeCount(i) {
    let maxNextValue = arrayRange[l - i - 2].minValue;

    if (arrayRange[l - 1 - i].maxValue > maxNextValue) {
      const dividedCount = Math.ceil(nums[i] / maxNextValue);
      const avgValue = nums[i] / dividedCount;
      arrayRange[l - 1 - i].minValue = Math.floor(avgValue);
      arrayRange[l - 1 - i].maxValue = Math.ceil(avgValue);

      repCount += dividedCount - 1;
    }
  }

  for (let i = l - 2; i >= 0; i--) {
    getChangeCount(i);
  }

  return repCount;
};

console.log(minimumReplacement([2, 10, 20, 19, 1]));
