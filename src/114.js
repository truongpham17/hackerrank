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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (!root) return null
  let curNode = root
  const preorder = (node) => {
    if (!node) return
    curNode.left = node
    curNode = curNode.left
    preorder(node.left)
    preorder(node.right)
  }
  preorder(root.left)
  preorder(root.right)
  curNode = root
  while (curNode) {
    curNode.right = curNode.left;
    curNode.left = null;
    curNode = curNode.right
  }
  return root
};