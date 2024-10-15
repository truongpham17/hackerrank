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
var inorderTraversal = function (root) {
  const rs = []
  inorder(root, rs)
  return rs
};

const inorder = (node, rs) => {
  if (!node) return
  inorder(node.left, rs)
  rs.push(node.val)
  inorder(node.right, rs)
}