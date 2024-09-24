// MEDIUM
// https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/
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
var insertGreatestCommonDivisors = function (head) {
  const gcd = (x, y) => {
    while (y > 0) {
      let t = y
      y = x % y
      x = t
    }
    return x
  }
  let slide = head
  while (slide.next) {
    const temp = slide.next
    slide.next = new ListNode(gcd(slide.val, temp.val), temp)
    slide = temp
  }
  return head
};