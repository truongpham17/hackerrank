
var AllOne = function () {
  this.linkList = new DoubleLinkedList()
  this.keyMap = new Map();
  this.countMap = new Map();
};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) {
  if (!this.keyMap.has(key)) {
    if (this.countMap.has(1)) {
      this.keyMap.set(key, this.countMap.get(1))
    } else {
      const node = new LinkedListNode(1)
      this.countMap.set(1, node)
      this.keyMap.set(key, node)
      // add node
      this.linkList.addToNext(node)
    }
  } else {
    const node = this.keyMap.get(key)
    const value = node.value
    if (this.countMap.has(value + 1)) {
      const nextNode = this.countMap.get(value + 1)
      this.keyMap.set(key, nextNode)
      nextNode.value++
    } else {
      const newNode = new LinkedListNode(value + 1)
      this.linkList.addToNext(newNode, node)
    }
    node.count--
    if (node.count === 0) {
      this.linkList.deleteNode(node)
    }
  }

};

/** 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
  if (this.keyMap.has(key)) {
    // decrease 
    const node = this.keyMap.get(key)
    const value = node.value
    if (value - 1 > 0) {
      if (this.countMap.has(value - 1)) {
        const nextNode = this.countMap.get(value - 1)
        this.keyMap.set(key, nextNode)
        nextNode.count++
      } else {
        const newNode = new LinkedListNode(value - 1)
        
      }
    } else {
      this.keyMap.set(key, null)
      
    }

  }
};

/**
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {

};

/**
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {

};


class LinkedListNode {
  constructor(value, prev, next) {
    this.count = 1
    this.prev = prev;
    this.next = next
    this.value = value;
  }
}


class DoubleLinkedList {
  constructor() {
    this.head = new LinkedListNode(0)
    this.tail = new LinkedListNode(0)
    this.head.next = this.tail
    this.tail.next = this.head
  }

  addToNext(node, prev = this.head) {
    const next = prev.next;
    prev.next = node;
    node.next = next
    node.prev = prev;
    next.prev = node
  }
  deleteNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev
  }

}

/** 
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */