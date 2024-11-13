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
var replaceValueInTree = function (root) {
  const lPoint = []
  const travel = (node, l) => {
    if (!node) return
    if (!lPoint[l]) {
      lPoint[l] = 0;
    }


    lPoint[l] += node.val
    travel(node.left, l + 1)
    travel(node.right, l + 1)
  }
  travel(root, 0)
  const retravel = (node, l) => {
    if (!node) return;
    const level = lPoint[l + 1]
    if (!level) return;
    let sumChild = 0;
    if (node.left) {
      sumChild += node.left.val
    }
    if (node.right) {
      sumChild += node.right.val
    }
    if (node.left) {
      node.left.val = level - sumChild
      retravel(node.left, l + 1)
    }
    if (node.right) {
      node.right.val = level - sumChild
      retravel(node.right, l + 1)
    }

  }
  retravel(root, 0)
  root.val = 0;
  return root;
};