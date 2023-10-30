// src:https://leetcode.com/problems/partition-list/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  const lesser = [];
  const greater = [];
  let node = head;

  while (node !== null) {
    if (node.val >= x) {
      greater.push(node.val);
    } else {
      lesser.push(node.val);
    }
    node = node.next;
  }
  node = head;
  lesser.forEach((value) => {
    node.val = value;
    node = node.next;
  });
  node.value = x;
  node = node.next;
  greater.forEach((value) => {
    node.val = value;
    node = node.next;
  });
  return head;
};
