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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  const weight = []
  const check = (node, l) => {
    if (!node) return
    if (!weight[l]) {
      weight[l] = 0
    }
    weight[l] += node.val;
    check(node.left, l + 1)
    check(node.right, l + 1)
  }
  if (weight.length < k) return -1
  weight.sort((a, b) => a - b)
  return weight[k]
};
