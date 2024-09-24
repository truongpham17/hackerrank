// MEDIUM
// https://leetcode.com/problems/spiral-matrix-iv/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
  const rs = Array.from({ length: m }, () => Array(n).fill(-1))
  const DIRECTION = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]
  let curDirection = 0;

  const changeDirection = (direction) => (direction + 1) % 4

  const isValid = (x, y) => x >= 0 && x < m && y >= 0 && y < n && rs[x][y] === -1

  const curCoord = [0, 0]
  let temp = head
  while (temp) {
    const [x, y] = curCoord;
    rs[x][y] = temp.val
    temp = temp.next
    if (!isValid(x + DIRECTION[curDirection][0], y + DIRECTION[curDirection][1])) {
      curDirection = changeDirection(curDirection)
    }

    curCoord[0] += DIRECTION[curDirection][0]
    curCoord[1] += DIRECTION[curDirection][1]
  }
  return rs
};