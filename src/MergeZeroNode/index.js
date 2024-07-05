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
var mergeNodes = function (head) {
  const result = head;
  let temp = head;
  let window = head;
  let total = 0;
  while (temp !== null) {
    if (temp.val !== 0) {
      total += temp.val
    } else {
      if (total !== 0) {
        window.val = total
        total = 0;
        // check if not end of list
        if (temp.next) {
          window = window.next
        }
      }
    }
    temp = temp.next
  }
  window.next = null;
  return result
};
/**
 * 
 * ab
 * ababeabd
 * abadababa
 */