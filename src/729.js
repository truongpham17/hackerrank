// MEDIUM
var MyCalendar = function () {
  this.bst = new BinarySearchTree((a, b) => a[0] > b[0])
};

// BST come to play :D
/** 
 * @param {number} start 
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  // find [a,b] such that: a < end and b > start
  const largestSmaller = this.bst.findLargestSmaller([end,null])
  if (largestSmaller && largestSmaller[1] > start) {
    return false
  } else {
    this.bst.insert([start, end])
    return true
  }
  // have to maintain the binary! -> sort?
};

// Define a BSTNode class
class BSTNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

// Define the Binary Search Tree class
class BinarySearchTree {
  constructor(greaterThan = (x, y) => x > y) {
    this.root = null;
    this.greaterThan = greaterThan;
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
    if (this.greaterThan(node.val, newNode.val)) {
      // Insert in the left subtree
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      // Insert in the right subtree
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Search for a value in the BST
  search(value) {
    return this.searchNode(this.root, value);
  }

  // Helper function for searching a node
  searchNode(node, value) {
    if (node === null) {
      return null; // Value not found
    }

    if (this.greaterThan(node.val, value)) {
      return this.searchNode(node.left, value); // Search in left subtree
    } else if (this.greaterThan(value, node.val)) {
      return this.searchNode(node.right, value); // Search in right subtree
    } else {
      return node; // Value found
    }
  }

  findLargestSmaller(value) {
    if (this.root === null) {
      return null;
    }
    let rs = null;
    let cur = this.root;
    while (cur !== null) {
      if (this.greaterThan(value, cur.val)) {
        rs = cur.val;
        cur = cur.right;
      } else {
        cur = cur.left;
      }
    }
    return rs;
  }

  findLargestSmallerOrEqual(value) {
    if (this.root === null) {
      return null;
    }
    let rs = null;
    let cur = this.root;
    while (cur !== null) {
      if (this.greaterThan(value, cur.val)) {
        rs = cur.val;
        cur = cur.right;
      } else if (this.greaterThan(cur.val, value)) {
        cur = cur.left;
      } else {
        return cur.val;
      }
    }
    return rs;
  }

  findSmallestLarger(value) {
    if (this.root === null) {
      return null;
    }
    let rs = null;
    let cur = this.root;
    while (cur !== null) {
      if (this.greaterThan(cur.val, value)) {
        rs = cur.val;
        cur = cur.left;
      } else {
        cur = cur.right;
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
      if (this.greaterThan(cur.val, value)) {
        rs = cur.val;
        cur = cur.left;
      } else if (this.greaterThan(value, cur.val)) {
        cur = cur.right;
      } else {
        return cur.val;
      }
    }
    return rs;
  }

  // In-order traversal (Left, Root, Right)
  inorder(node = this.root) {
    if (node !== null) {
      this.inorder(node.left);
      // do
      this.inorder(node.right);
    }
  }

  // Pre-order traversal (Root, Left, Right)
  preorder(node = this.root) {
    if (node !== null) {
      // do sth here
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // Post-order traversal (Left, Right, Root)
  postorder(node = this.root) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      // do
    }
  }
}