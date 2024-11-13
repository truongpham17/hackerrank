/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
  // asume that nodeA and nodeB are equal
  let result = true;
  const isArrayEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    return true
  }
  const check = (nodeA, nodeB) => {
    if (!result) return
    if (!nodeA && !nodeB) return

    const nodeAChild = [nodeA.left, nodeA.right].map(i => i?.val)
    const nodeBChild = [nodeB.left, nodeB.right].map(i => i?.val)

    if (isArrayEqual(nodeAChild, nodeBChild)) {
      check(nodeA.left, nodeB.left)
      check(nodeA.right, nodeB.right)
      // doing stuff
    } else if (isArrayEqual(nodeAChild, nodeBChild.reverse())) {
      check(nodeA.left, nodeB.right)
      check(nodeA.right, nodeB.left)
    } else {
      result = false;
    }
  }

  if (root1?.val !== root2?.val) return false
  check(root1, root2)
  return result
};