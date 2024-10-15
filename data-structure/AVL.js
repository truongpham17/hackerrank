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

  // Helper function to delete a node and maintain AVL balance
  deleteNode(node, value) {
    // Standard BST deletion
    if (node === null) {
      return node; // Node not found
    }

    if (this.greaterThan(node.val, value)) {
      node.left = this.deleteNode(node.left, value);
    } else if (this.greaterThan(value, node.val)) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node with the value found

      // Node with only one child or no child
      if (node.left === null || node.right === null) {
        const temp = node.left ? node.left : node.right;

        if (temp === null) {
          // No children case (leaf node)
          node = null;
        } else {
          // One child case
          node = temp;
        }
      } else {
        // Node with two children, get the in-order successor (smallest in the right subtree)
        const temp = this.findMinValueNode(node.right);
        node.val = temp.val; // Replace node's value with the in-order successor's value
        node.right = this.deleteNode(node.right, temp.val); // Delete the in-order successor
      }
    }

    // If the tree had only one node, return
    if (node === null) {
      return node;
    }

    // Rebalance the tree after deletion
    return this.rebalance(node);
  }

  // Delete a value from the AVL Tree
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  // Helper function to find the node with the minimum value in a subtree
  findMinValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Search for a value in the AVL Tree
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
      return null
    }
    let rs = null
    let cur = this.root;
    while (cur !== null) {
      // cur < value
      if (this.greaterThan(value, cur.val)) {
        rs = cur.val
        cur = cur.right
      } else {
        // cur>=value
        cur = cur.left
      }
    }
    return rs
  }

  findLargestSmallerOrEqual(value) {
    if (this.root === null) {
      return null
    }
    let rs = null
    let cur = this.root;
    while (cur !== null) {
      // cur < value
      if (this.greaterThan(value, cur.val)) {
        rs = cur.val
        cur = cur.right
      } else if (this.greaterThan(cur.val, value)) {
        // cur>value
        cur = cur.left
      } else {
        // cur = value
        return cur.val
      }
    }
    return rs
  }

  findSmallestLarger(value) {
    if (this.root === null) {
      return null
    }

    let rs = null
    let cur = this.root;
    while (cur !== null) {
      // cur > value
      if (this.greaterThan(cur.val, value)) {
        rs = cur.val
        cur = cur.left
      } else {
        // cur<=value
        cur = cur.right
      }
    }
    return rs
  }

  findSmallestLargerOrEqual(value) {
    if (this.root === null) {
      return null
    }

    let rs = null
    let cur = this.root;
    while (cur !== null) {
      // cur > value
      if (this.greaterThan(cur.val, value)) {
        rs = cur.val
        cur = cur.left
        // cur < value
      } else if (this.greaterThan(value, cur.val)) {
        cur = cur.right
      } else {
        // cur = value
        return cur.val
      }
    }
    return rs
  }

  // In-order traversal (Left, Root, Right)
  inorder(node = this.root) {
    if (node !== null) {
      this.inorder(node.left);
      // ->> TODO 
      this.inorder(node.right);
    }
  }

  // Pre-order traversal (Root, Left, Right)
  preorder(node = this.root) {
    if (node !== null) {
      // ->> TODO 
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // Post-order traversal (Left, Right, Root)
  postorder(node = this.root) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      // ->> TODO
    }
  }
}
