// MEDIUM
// https://leetcode.com/problems/split-linked-list-in-parts/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode[]}
 */
var splitListToParts = function (head, k) {
  let size = 0;
  const travel = (x) => {
    if (x) {
      size++
      travel(x.next)
    }
  }
  travel(head)

  const count = Math.floor(size / k)
  const mod = size % k
  const rs = []

  const split = (curHead, size) => {
    if (size === 0) {
      rs.push(null)
      return null
    }

    rs.push(curHead)

    let temp = curHead
    for (let i = 0; i < size - 1; i++) {
      temp = temp.next
    }
    const next = temp.next
    temp.next = null
    return next
  }
  let modRemaining = mod;
  let curHead = head
  for (let i = 0; i < k; i++) {
    curHead = split(curHead, count + (modRemaining > 0 ? 1 : 0))
    modRemaining--
  }
  return rs;
};