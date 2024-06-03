class TreeNode {
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

  addNode(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
    } else {
      this._addNodeRecursively(this.root, value);
    }
  }

  _addNodeRecursively(node, value) {
    if (value <= node.value) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        this._addNodeRecursively(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        this._addNodeRecursively(node.right, value);
      }
    }
  }

  removeNode(value) {
    this.root = this._removeNodeRecursively(this.root, value);
  }

  _removeNodeRecursively(node, value) {
    if (node === null) {
      return node;
    }

    if (value < node.value) {
      node.left = this._removeNodeRecursively(node.left, value);
    } else if (value > node.value) {
      node.right = this._removeNodeRecursively(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        node.value = this._findMinValue(node.right);
        node.right = this._removeNodeRecursively(node.right, node.value);
      }
    }

    return node;
  }

  _findMinValue(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  popMaxNode() {
    if (!this.root) {
      return null
    }
    const maxValue = this._popMaxNodeRecursively(this.root);
    return maxValue
  }

  _popMaxNodeRecursively(node) {
    if (node.right === null) {
      const maxValue = node.value;
      this.removeNode(node.value);
      return maxValue
    } else {
      return this._popMaxNodeRecursively(node.right);
    }
  }
  getMaxValue() {
    if (!this.root) {
      return null;
    }
    let currentNode = this.root;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.value;
  }
}
/**
 * @param {number[]} nums
 * @param {number[]} freq
 * @return {number[]}
 */
var mostFrequentIDs = function (nums, freq) {
  const map = new Map()
  const node = new BinarySearchTree()
  const result = []
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      node.removeNode(map.get(nums[i]))
      map.set(nums[i], map.get(nums[i]) + freq[i])
    } else {
      map.set(nums[i], freq[i])
    }
    node.addNode(map.get(nums[i]))
    result.push(node.getMaxValue())
  }
  return result
};

console.log(mostFrequentIDs([5, 5, 3], [2, -2, 1]))