/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  const createTree = (arr) => {
    if (arr.length === 0) return null
    const root = new TreeNode();
    if (arr.length === 1) {
      root.val = arr[0]
      return root
    }
    const middle = Math.floor(arr.length / 2)

    root.val = arr[middle]
    root.left = createTree(arr.slice(0, middle))
    root.right = createTree(arr.slice(middle + 1))
    return root;
  }
  return createTree(nums)
};