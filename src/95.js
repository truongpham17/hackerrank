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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const arr = Array.from({ length: n }, (_, k) => k + 1)
  const generate = (cur) => {
    const value = []
    for (let i = 0; i < cur.length; i++) {
      const allLefts = generate(cur.slice(0, i))
      const allRights = generate(cur.slice(i + 1))
      for (const left of allLefts) {
        for (const right of allRights) {
          const root = new TreeNode()
          root.val = cur[i]
          root.left = left;
          root.right = right;
          value.push(root)
        }
      }
    }
    if(value.length === 0) {
      return [null]
    }
    return value
  }
  return generate(arr)
};
console.log(generateTrees(10))