/**
 * @param {string} s
 * @return {string}
 */
var clearStars = function (s) {
  const list = new LinkedList();
  for (const pos in s) {
    const char = s[pos]
    if (char !== '*') {
      list.addNode(char, pos);
    } else {
      list.removeRoot();
    }
  }
  const result = list.getAllNodes();
  result.sort((a, b) => a.pos - b.pos);
  let str = '';
  for (const item of result) {
    str += item.char;
  }
  return str
};

class LinkedList {
  root = { char: 'A', pos: -1, next: null };//char and pos, next
  addNode(char, pos) {
    let cur = this.root;
    while (cur.next && cur.next.char < char) {
      cur = cur.next;
    }
    const nextNode = cur.next;
    const curNode = { char, pos, next: nextNode };
    cur.next = curNode
  }

  removeRoot() {
    this.root.next = this.root.next?.next
  }

  getAllNodes() {
    const arr = [];
    let cur = this.root.next;
    while (cur) {
      arr.push({ char: cur.char, pos: cur.pos })
      cur = cur.next
    }
    return arr;
  }
}
console.log(clearStars('acba***'))