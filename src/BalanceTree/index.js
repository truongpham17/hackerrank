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
var balanceBST = function (root) {
  const arr = []
  const visit = (node) => {
    if (!node) return;
    visit(node.left);

    arr.push(node.val);
    visit(node.right)
  }
  visit(root)
  const createNode = (l, r) => {
    if (l > r) return null;
    const middle = Math.round((l + r) / 2)
    const left = createNode(l, middle - 1)
    const right = createNode(middle + 1, r)
    return TreeNode(arr[middle], left, right)
  }
  return createNode(0, arr.length - 1)
};
/**
 * KEYWORDS: Balance Tree
 */