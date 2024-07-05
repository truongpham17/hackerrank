/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function (head) {
  let index = 0;
  let prevValue = head.val;
  let tempNode = head.next;
  let firstPeak = -1
  let minDiff = 10 ** 10
  let tempPeak = -1
  while (tempNode.next !== null) {
    index++;
    if ((tempNode.val < prevValue && tempNode.val < tempNode.next.val) || (tempNode.val > prevValue && tempNode.val > tempNode.next.val)) {
      if (firstPeak === -1) {
        firstPeak = index
      } else if (index - tempPeak < minDiff) {
        minDiff = index - tempPeak;
      }
      tempPeak = index
    }
    prevValue = tempNode.val;
    tempNode = tempNode.next
  }
  if (firstPeak === -1 || minDiff === 10 ** 10) return [-1, -1]
  return [minDiff, tempPeak - firstPeak]
};