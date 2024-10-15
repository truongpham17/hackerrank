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
var recoverTree = function (root) {
  const arr = []
  const inorder = (node) => {
    if (!node) return
    inorder(node.left)
    arr.push(node.val)
    inorder(node.right)
  }
  inorder(root)
   arr.sort((a,b) => a - b)
  let curIndex = 0;
  const inorderAgain = (node) => {
    if (!node) return
    inorderAgain(node.left)
    node.val = arr[curIndex]
    curIndex++
    inorderAgain(node.right)
  }
  inorderAgain(root)

};