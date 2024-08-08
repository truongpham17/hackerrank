// https://leetcode.com/problems/create-binary-tree-from-descriptions/
// MEDIUM
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
  const map = new Map()
  const possibleRoot = new Set()
  for (const [parent, child, isLeft] of descriptions) {
    possibleRoot.add(parent)
    possibleRoot.delete(child)
    let parentNode = map.get(parent)
    let childNode = map.get(child)
    if (!parentNode) {
      parentNode = {
        val: parent,
        left: null,
        right: null
      }
    }
    if (!childNode) {
      childNode = {
        val: child,
        left: null,
        right: null
      }
    }
    if (isLeft) {
      parentNode.left = childNode
    } else {
      parentNode.right = childNode
    }
    map.set(parent, parentNode)
    map.set(child, childNode)
  }
  for (const [_, child] of descriptions) {
    possibleRoot.delete(child)
  }
  const root = [...possibleRoot.values()][0]
  return map.get(root)
};
console.log(createBinaryTree([[20, 15, 1], [20, 17, 0], [50, 20, 1], [50, 80, 0], [80, 19, 1]]))