/**
 * @param {number[]} arr
 * @return {number}
 */
var oddEvenJumps = function (arr) {
  const n = arr.length
  // store [value, odd, even]
  const minTree = new BinarySearchTree()
  minTree.insert([arr[n - 1], true, true])
  let count = 1;
  for (let i = n - 2; i >= 0; i--) {
    const node = [arr[i], false, false]
    const maxSmaller = minTree.findLargestSmallerOrEqual(arr[i])
    const minLarger = minTree.findSmallestLargerOrEqual(arr[i])
    if (maxSmaller) {
      node[2] = maxSmaller[1]
    }
    if (minLarger) {
      node[1] = minLarger[2]
    }
    minTree.insert(node)

    if (node[1]) {
      count++
    }
  }
  return count
};



class BSTNode {
  constructor(data) {
    this.val = data;
    this.left = null;
    this.right = null;
  }
}

// Define the Binary Search Tree class
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new BSTNode(value);
    if (this.root === null) {
      this.root = newNode; // If tree is empty, make the new node the root
    } else {
      this.insertNode(this.root, newNode); // Otherwise, use a helper method
    }
  }

  // Helper function for inserting a node
  insertNode(node, newNode) {
    if (node.val[0] > newNode.val[0]) {
      // Insert in the left subtree
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (node.val[0] < newNode.val[0]) {
      // Insert in the right subtree
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      node.val = newNode.val
    }
  }

  findLargestSmallerOrEqual(value) {
    if (this.root === null) {
      return null;
    }
    let rs = null;
    let cur = this.root;
    while (cur !== null) {
      if (value > cur.val[0]) {
        rs = cur.val;
        cur = cur.right;
      } else if (value < cur.val[0]) {
        cur = cur.left;
      } else {
        return cur.val
      }
    }
    return rs;
  }

  findSmallestLargerOrEqual(value) {
    if (this.root === null) {
      return null;
    }
    let rs = null;
    let cur = this.root;
    while (cur !== null) {
      if (cur.val[0] > value) {
        rs = cur.val;
        cur = cur.left;
      } else if (cur.val[0] < value) {
        cur = cur.right;
      } else {
        return cur.val
      }
    }
    return rs;
  }

}


console.log(oddEvenJumps([31, 28, 8, 41, 20, 28, 41, 26, 46, 30, 41, 34, 2, 29, 24, 39, 28, 11, 22, 21, 33, 15, 14, 35, 49, 23, 15, 46, 19, 28, 13, 19, 38]))
console.log(oddEvenJumps([2, 3, 1, 1, 4]))