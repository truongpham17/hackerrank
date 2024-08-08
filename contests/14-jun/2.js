/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const set = new Set()
  for (const num of nums) {
    set.add(num)
  }
  const newHead = {
    val: 0,
    next: null
  }
  let temp = newHead;
  let tempNode = head;
  while (tempNode !== null) {
    if (!set.has(tempNode.val)) {
      temp.next = { val: tempNode.val, next: null };
      temp = temp.next
    }
    tempNode = tempNode.next
  }
  return newHead.next
};