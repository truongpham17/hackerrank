// https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/description/?envType=daily-question&envId=2024-07-16
// MEDIUM
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  const MULTIPLE = 10 ** 6
  let startIndex = -1;
  let destIndex = -1
  for (let i = 1; i < root.length; i++) {
    const parentIndex = Math.floor((i - 1) / 2)
    if (root[i] === startValue) {
      startIndex = i
    }
    if (root[i] === destValue) {
      destIndex = i
    }
    root[i] = i * MULTIPLE + parentIndex // value, parent, i % 2 === 1? left: right
  }

  const getParent = (i) => i % MULTIPLE
  let tempStart = startIndex;
  let tempDes = destIndex;
  const startPathToRoot = []
  // 0 is the root
  while (tempStart !== 0) {
    startPathToRoot.push(tempStart)
    tempStart = Math.floor((tempStart - 1) / 2)
  }
  startPathToRoot.push(0)


  const endPathToRoot = []
  while (tempDes !== 0) {
    endPathToRoot.push(tempDes)
    tempDes = Math.floor((tempDes - 1) / 2)
  }
  const getLastElement = (arr, index) => arr[arr.length - 1 - index]
  let index = 0;
  while (getLastElement(startPathToRoot, index) === getLastElement(endPathToRoot, index)) {
    index++
  }
  const result = []
  for (let i = 0; i < startPathToRoot.length - 1 - index; i++) {
    result.push('U')
  }
  for (let i = 0; i < index; i++) {
    result.push(endPathToRoot[i] % 2 === 0 ? 'R' : 'L')
  }
return result
};
console.log(getDirections([5, 1, 2, 3, null, 6, 4], 3, 6))