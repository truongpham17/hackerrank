
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the BST
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Helper method to find the minimum value node in a subtree
  findMin(node = this.root) {
    if (!node) {
      return { value: -1 }
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  // Delete a node from the BST
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(root, value) {
    if (root === null) return root; // Base case: empty tree

    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      // Case 1: Node with no child (leaf node)
      if (!root.left && !root.right) return null;

      // Case 2: Node with one child
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      // Case 3: Node with two children
      let minRight = this.findMin(root.right);
      root.value = minRight.value;
      root.right = this.deleteNode(root.right, minRight.value);
    }
    return root;
  }
}

var NumberContainers = function () {
  this.numberMap = new Map();
  this.indexMap = new Map()
};

/** 
 * @param {number} index 
 * @param {number} number
 * @return {void}
 */
NumberContainers.prototype.change = function (index, number) {
  if (this.indexMap.has(index)) {
    const oldNumber = this.indexMap.get(index)
    this.numberMap.get(oldNumber).delete(index)
  }
  this.indexMap.set(index, number)
  if (!this.numberMap.has(number)) {
    this.numberMap.set(number, new BinarySearchTree())
  }
  this.numberMap.get(number).insert(index)
};

/** 
 * @param {number} number
 * @return {number}
 */
NumberContainers.prototype.find = function (number) {
  if (!this.numberMap.has(number)) {
    return -1
  }
  return this.numberMap.get(number).findMin().value
};

/** 
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */