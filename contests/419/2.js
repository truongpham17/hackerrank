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
var kthLargestPerfectSubtree = function (root, k) {
  const perfectArr = []
  const travel = (node) => {
    const childrenCount = !!node.left + !!node.right
    if (childrenCount === 1) {
      if (node.left) {
        travel(node.left)
      }
      if (node.right) {
        travel(node.right)
      }
      return -1
    }
    if (childrenCount === 0) {
      perfectArr.push(0)
      return 0;
    }
    const leftHeight = travel(node.left)
    const rightHeight = travel(node.right)
    if (leftHeight === rightHeight && leftHeight !== -1 && rightHeight !== -1) {
      perfectArr.push(leftHeight + 1)
      return leftHeight + 1
    }
    return -1
  }
  travel(root)

  perfectArr.sort((a, b) => b - a)
  if (perfectArr.length < k) return -1
  const height = perfectArr[k - 1]
  return 2 ** (height + 1) - 1
};