// source: https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function (root) {
  let array = [root];
  let max = Number.MIN_SAFE_INTEGER;
  let level = 1;
  let saveLevel = 1;
  while (array.length > 0) {
    let sum = 0;
    const childArr = [];
    for (let i = 0; i < array.length; i++) {
      sum += array[i].val;
      if (array[i].left !== null) {
        childArr.push(array[i].left);
      }

      if (array[i].right !== null) {
        childArr.push(array[i].right);
      }
    }
    if (max < sum) {
      max = sum;
      saveLevel = level;
    }
    level++;
    array = childArr;
  }
  return saveLevel;
};
