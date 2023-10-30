// source: https://leetcode.com/problems/add-two-numbers/
// DIFFICULTY LEVEL: MEDIUM
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function (l1, l2) {
  let firstList = l1;
  let secondList = l2;
  let rem = 0;
  while (firstList !== null && secondList !== null) {
    firstList.val = firstList.val + secondList.val + rem;
    if (firstList.val >= 10) {
      rem = 1;
      firstList.val = firstList.val - 10;
    } else {
      rem = 0;
    }
    secondList = secondList.next;
    if (firstList.next !== null) {
      firstList = firstList.next;
    } else {
      firstList.next = secondList;
      if (firstList.next !== null) {
        firstList = firstList.next;
      }
      break;
    }
  }
  if (firstList.next === null) {
    if (rem > 0) {
      firstList.next = {
        val: rem,
        next: null,
      };
    }
    return l1;
  }

  let result = firstList;

  while (true) {
    if (rem > 0) {
      result.val += rem;
      rem = 0;
    }
    if (result.val >= 10) {
      rem = 1;
      result.val = result.val % 10;
    }

    if (result.next !== null) {
      result = result.next;
    } else {
      break;
    }
  }
  if (rem > 0) {
    result.next = {
      val: rem,
      next: null,
    };
  }
  return l1;
};
