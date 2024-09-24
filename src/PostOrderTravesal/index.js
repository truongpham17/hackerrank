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
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  const rs = []
  const travel = (node) => {
    if (!node) return
    travel(node.left)
    travel(node.right)
    rs.push(node.val)
  }
  travel(root)
  return rs
};