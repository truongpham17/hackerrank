//source: https://leetcode.com/problems/minimize-the-maximum-difference-of-pairs/
/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minimizeMax = function (nums, p) {
  if (p === 0) return 0;
  nums.sort((a, b) => a - b);
  const length = nums.length;
  const highest = nums[length - 1] - nums[0];

  const lowest = nums.reduce(
    (a, b, i) => (i < length - 1 ? Math.min(a, Math.abs(b - nums[i + 1])) : a),
    highest
  );

  function isSuitable(maxDiff, pairCount) {
    let count = 0;
    let countStreak = 0;
    for (let i = 0; i < length - 1; i++) {
      if (Math.abs(nums[i] - nums[i + 1]) <= maxDiff) {
        countStreak++;
      } else {
        count += Math.ceil(countStreak / 2);
        countStreak = 0;
      }
    }
    count += Math.ceil(countStreak / 2);
    if (count >= pairCount) return true;
    return false;
  }

  function findMinimizeMaxDiff(minTarget, maxTarget) {
    if (minTarget === maxTarget) {
      if (isSuitable(minTarget, p)) return minTarget;
      return -1;
    }
    const middle = Math.floor((minTarget + maxTarget) / 2);
    if (isSuitable(middle, p)) {
      return findMinimizeMaxDiff(minTarget, middle);
    } else {
      return findMinimizeMaxDiff(middle + 1, maxTarget);
    }
  }

  return findMinimizeMaxDiff(lowest, highest);
};

console.log(minimizeMax([3, 11, 4, 3, 5, 7, 4, 4, 5, 5], 3));
