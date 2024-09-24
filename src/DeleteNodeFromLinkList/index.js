// MEDIUM
// https://leetcode.com/problems/delete-nodes-from-linked-list-present-in-array/?envType=daily-question&envId=2024-09-06
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
  nums = new Set(nums)
  // nums.sort((a, b) => a - b)

  // const binarySearch = (x) => {
  //   let l = 0;
  //   let r = nums.length - 1
  //   while (l <= r) {
  //     const mid = (l + r) >> 1
  //     if (nums[mid] < x) {
  //       l = mid + 1
  //     } else if (nums[mid] > x) {
  //       r = mid - 1
  //     } else {
  //       return true
  //     }
  //   }
  //   return false
  // }

  const removeNode = (prevNode, nextNode) => {
    prevNode.next = nextNode
  }
  // remove the head
  let temp = { val: -1, next: head };
  const root = temp;
  while (temp !== null && temp.next !== null) {
    if (nums.has(temp.next.val)) {
      removeNode(temp, temp.next.next)
    } else {
      temp = temp.next
    }
  }
  return root.next
};
