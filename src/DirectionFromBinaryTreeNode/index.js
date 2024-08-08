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
  const nodeArr = [1, 3, 8, 7, null, 4, 5, 6, null, null, null, null, null, null, 2]
  // let queue = [root]
  // while (queue.length !== 0) {
  //   const newQueue = []
  //   for (const node of queue) {
  //     if (node) {
  //       nodeArr.push(node.val)
  //       newQueue.push(node.left)
  //       newQueue.push(node.right)
  //     } else {
  //       nodeArr.push(null)
  //     }
  //   }
  //   queue = newQueue
  // }

  let startIndex = -1;
  let destIndex = -1
  for (let i = 0; i < nodeArr.length; i++) {
    if (nodeArr[i] === startValue) {
      startIndex = i
    }
    if (nodeArr[i] === destValue) {
      destIndex = i
    }
  }
  const map = new Map();
  let temp = startIndex;
  console.log("🚀 ~ getDirections ~ startIndex:", startIndex)
  let step = 0;
  while (temp >= 0) {
    map.set(temp, step)
    temp = Math.floor((temp - 1) / 2)
    step++
  }
  // map.set(0, step + 1)
  console.log(map)
  let fromDesToCommonParent = ""
  let tempDest = destIndex
  while (!map.has(tempDest)) {
    if (tempDest % 2 === 1) {
      fromDesToCommonParent += "L"
    } else {
      fromDesToCommonParent += "R"
    }
    tempDest = Math.floor((tempDest - 1) / 2)
  }
  let result = ""
  for (let i = 0; i < map.get(tempDest); i++) {
    result += "U"
  }
  for (let i = fromDesToCommonParent.length - 1; i >= 0; i--) {
    result += fromDesToCommonParent[i]
  }
  return result
};
console.log(getDirections([5, 1, 2, 3, null, 6, 4], 2, 1))