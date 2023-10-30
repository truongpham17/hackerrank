// Difficulty level: MEDIUM
// Source: https://leetcode.com/problems/132-pattern/
/**
 * @param {number[]} nums
 * @return {boolean}
 */

var find132pattern = function (nums) {
  let stacks = [{ min: Number.MAX_SAFE_INTEGER, max: null }];
  for (let i = 0; i < nums.length; i++) {
    const lastStack = stacks[stacks.length - 1];
    if (nums[i] < lastStack.min) {
      if (lastStack.max === null) {
        lastStack.min = nums[i];
      } else {
        stacks.push({ min: nums[i], max: null });
      }
      continue;
    }
    for (let j = 0; j < stacks.length; j++) {
      if (
        stacks[j].max !== null &&
        nums[i] > stacks[j].min &&
        nums[i] < stacks[j].max
      ) {
        return true;
      }
    }

    if (lastStack.max === null || nums[i] > lastStack.max) {
      lastStack.max = nums[i];
      stacks = stacks.filter(
        (stack) => !(stack.min > lastStack.min && stack.max < lastStack.max)
      );
      for (let j = 0; j < stacks.length - 1; j++) {
        let find = false;
        if (stacks[j].max > lastStack.min && lastStack.max > stacks[j].max) {
          stacks[j].min = Math.min(lastStack.min, stacks[j].min);
          stacks[j].max = lastStack.max;
          find = true;
        }
        if (find === true) {
          stacks.pop();
        }
      }
      continue;
    }
  }
  return false;
};

console.log(find132pattern([1, 0, 1, -4, -3]));

/**
 * a,b c: a < c < b
 * implement stack ?
 * a: push a
 * if b > a : push b
 * if c < a :
 *     x
 *         x
 * x
 *
 *  x
 *         x
 *     x
 */
