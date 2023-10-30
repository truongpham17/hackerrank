// source: https://leetcode.com/problems/second-minimum-node-in-a-binary-tree/editorial/
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
var findSecondMinimumValue = function (root) {
  let secondV = null;
  let firstDiff = null;
  function findNode(curNode) {
    if (!curNode) return;
    if (curNode.val !== root.val) {
      if (!firstDiff) {
        firstDiff = curNode.val;
      }
      if (curNode.val < secondV || !secondV) {
        secondV = curNode.val;
      }
    } else {
      findNode(curNode.left);
      findNode(curNode.right);
    }
  }
  findNode(root);
  return Math.min(firstDiff, secondV) || -1;
};
