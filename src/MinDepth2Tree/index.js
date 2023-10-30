// https://leetcode.com/problems/minimum-depth-of-binary-tree/
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
 * @return {number}
 */
var minDepth = function (root) {
  let queue = [root];
  let secondQueue = [];
  let length = 1;
  function bfs() {
    queue.forEach((node) => {
      if (node.left === undefined && node.right === undefined) return length;
      if (node.left !== undefined) {
        secondQueue.push(node.left);
      }
      if (node.right !== undefined) {
        secondQueue.push(node.right);
      }
    });
    length++;
    queue = secondQueue;
    return bfs();
  }
  return bfs();
};
