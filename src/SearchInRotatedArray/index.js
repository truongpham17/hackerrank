function searchInRotatedArray(nums, target) {}

function findBreakPoint(nums) {
  const n = nums.length - 1;
  const middle = Math.floor(n / 2);
  if (middle === 0 || middle + 1 === n) return -1;
  if (nums[middle] > nums[middle + 1]) return middle;
  return Math.max(findBreakPoint());
}
