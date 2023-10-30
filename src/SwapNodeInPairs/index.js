// source: https://leetcode.com/problems/swap-nodes-in-pairs/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  let newHead = head?.next ? head.next : head;
  let curNode = head;
  while (curNode) {
    const n1 = curNode?.next;
    const n2 = curNode?.next?.next;
    const n3 = curNode?.next?.next?.next;
    if (n1) {
      if (n3) {
        curNode.next = n3;
      } else {
        curNode.next = n2;
      }
      n1.next = curNode;
      curNode = n2;
    } else {
      curNode = null;
    }
  }
  return newHead;
};
