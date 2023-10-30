// source: https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/description/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let temp = null;
  while (slow) {
    const next = slow.next;
    slow.next = temp;
    temp = slow;
    slow = next;
  }
  let max = 0;
  fast = head;
  while (temp) {
    max = Math.max(max, temp.val + fast.val);
    fast = fast.next;
    temp = temp.next;
  }
  return max;
};
