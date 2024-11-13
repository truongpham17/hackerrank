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
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function (root, queries) {
  const parent = []
  const height = []// store three values, original, left cut, right cut
  const travel = (node) => {
    if (!node) return -1
    if (node.left) {
      parent[node.left.val] = node
    }
    if (node.right) {
      parent[node.right.val] = node
    }
    const leftHeight = travel(node.left)
    const rightHeight = travel(node.right)
    const nodeHeight = Math.max(leftHeight, rightHeight) + 1
    height[node.val] = [nodeHeight, rightHeight + 1, leftHeight + 1]
    return height[node.val][0]
  }
  travel(root)
  const rs = []
  for (const nodeVal of queries) {
    const parentNode = parent[nodeVal]
    // left is cut
    if(parentNode.left && parentNode.left.val === nodeVal) {
      rs.push(height[parentNode.val][1])
    } else  {
      // rs.push(height[])
    }
  }
  return rs
};