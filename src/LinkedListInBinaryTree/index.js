// https://leetcode.com/problems/linked-list-in-binary-tree/
// MEDIUM
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  let rs = false
  const check = (listNode, treeNode) => {
    if (rs) return

    if (listNode === null) {
      rs = true;
      return
    }

    if (listNode.val === treeNode?.val) {
      check(listNode.next, treeNode.left)
      check(listNode.next, treeNode.right)
    }
  }

  const checkRoot = (treeNode) => {
    if (!treeNode) return
    if (treeNode.val === head.val) {
      check(head, treeNode)
    }
    checkRoot(treeNode.left)
    checkRoot(treeNode.right)
  }
  checkRoot(root)
  return rs
};