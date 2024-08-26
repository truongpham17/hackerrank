/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  const rs = []
  const travel = (node) => {
    for (let i = 0; i < node.children.length; i++) {
      travel(node.children[i])
    }

    rs.push(node.val)
  }
  if (!root) return rs
  travel(root)
  return rs
};