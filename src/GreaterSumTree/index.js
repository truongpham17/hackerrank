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
 * @return {TreeNode}
 */
var bstToGst = function (root) {
  let temp = 0;
  function travel(node) {
    if (!node) return 0;
    // temp += node.val;
    travel(node.right);
    temp += node.val
    node.val = temp;
    travel(node.left);
  }
  travel(root)
  return root

};