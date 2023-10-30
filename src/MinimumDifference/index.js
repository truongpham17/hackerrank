// source: https://leetcode.com/problems/minimum-absolute-difference-in-bst/
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
var getMinimumDifference = function (root) {
  let min = Number.MAX_VALUE;
  let curVal = Number.MAX_VALUE;

  function reversal(node) {
    if (node === null) return;
    reversal(node.left);
    const diff = Math.abs(curVal - node.val);
    if (diff < min) {
      min = diff;
    }
    curVal = node.val;
    reversal(node.right);
  }
  reversal(root);
  return min;
};
