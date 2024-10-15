
var MyCalendarThree = function () {
  this.keys = new AVLTree()
  this.map = new Map()
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function (startTime, endTime) {
  const init = (key) => {
    if (!this.map.has(key)) {
      this.map.set(key, 0)
    }
  }
  const update = (key, delta) => {
    init(key)
    this.map.set(key, this.map.get(key) + delta)
  }

  this.keys.insert(startTime)
  this.keys.insert(endTime)
  update(startTime, 1)
  update(endTime, -1)
  const max = { value: 0 }
  const value = { value: 0 }
  this.keys.inorder(undefined, max, value, this.map)
  return max.value
};

// Define an AVL Tree Node class with height tracking
class AVLNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
    this.height = 1; // Height is initialized to 1 for new nodes
  }
}

// Define the AVL Tree class
class AVLTree {
  constructor(greaterThan = (x, y) => x > y) {
    this.root = null;
    this.greaterThan = greaterThan;
  }

  // Get the height of the node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Get the balance factor of the node
  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Update the height of the node
  updateHeight(node) {
    if (node) {
      node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
  }

  // Right rotate subtree rooted with y
  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    this.updateHeight(y);
    this.updateHeight(x);

    // Return the new root
    return x;
  }

  // Left rotate subtree rooted with x
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    this.updateHeight(x);
    this.updateHeight(y);

    // Return the new root
    return y;
  }

  // Function to rebalance a node
  rebalance(node) {
    // Update height of the current node
    this.updateHeight(node);

    // Get the balance factor
    const balanceFactor = this.getBalanceFactor(node);

    // Balance the node if needed

    // Left-Left case (right rotation)
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rightRotate(node);
    }

    // Left-Right case (left rotation on left child, then right rotation)
    if (balanceFactor > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // Right-Right case (left rotation)
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.leftRotate(node);
    }

    // Right-Left case (right rotation on right child, then left rotation)
    if (balanceFactor < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  // Insert a value into the AVL Tree
  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  // Helper function to insert a node with balancing
  insertNode(node, value) {
    if (node === null) {
      return new AVLNode(value); // Insert new node if tree is empty
    }

    // Perform normal BST insertion
    if (this.greaterThan(node.val, value)) {
      node.left = this.insertNode(node.left, value);
    } else if (this.greaterThan(value, node.val)) {
      node.right = this.insertNode(node.right, value);
    } else {
      return node; // Duplicate values are not allowed in this AVL Tree
    }

    // Rebalance the tree after insertion
    return this.rebalance(node);
  }


  // In-order traversal (Left, Root, Right)
  inorder(node = this.root, max, value, map) {
    if (node !== null) {
      this.inorder(node.left, max, value, map)
      value.value += map.get(node.val)
      this.inorder(node.right, max, value, map)
    }
    if (value.value > max.value) {
      max.value = value.value
    }
  }

}

/** 
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */