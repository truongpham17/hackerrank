class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(parentNode, newNode) {
    if (newNode.data < parentNode.data) {
      if (parentNode.left === null) {
        parentNode.left = newNode;
      } else {
        this.insertNode(parentNode.left, newNode);
      }
    } else {
      if (parentNode.right === null) {
        parentNode.right = newNode;
      } else {
        this.insertNode(parentNode.right, newNode);
      }
    }
  }
  sort() {
    this.sortNode(this.root);
  }
  sortNode(node) {
    if (node.left) {
      this.sortNode(node.left);
    }
    console.log(node.data);
    if (node.right) {
      this.sortNode(node.right);
    }
  }
}

const BST = new BinarySearchTree();

BST.insert(1);
BST.insert(3);
BST.insert(5);
BST.insert(2);
BST.insert(4);
BST.insert(8);
BST.insert(6);
console.log(BST.sort());
