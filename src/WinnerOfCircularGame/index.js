/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findTheWinner = function (n, k) {
  const linkedList = new LinkedList();
  for (let i = 0; i < n; i++) {
    linkedList.add(i + 1)
  }
  linkedList.end()
  // linkedList.move()
  while (!linkedList.isEnd()) {
    for (let i = 0; i < k - 1; i++) {
      linkedList.move()
    }
    linkedList.remove()
  }
  return linkedList.peek()
};
class LinkedList {
  root = {
    val: null,
    next: null
  }
  temp = this.root
  cur = this.root
  count = 0;

  add(val) {
    this.count++
    this.temp.next = {
      val,
      next: null
    }
    this.temp = this.temp.next
  }
  move() {
    this.cur = this.cur.next
  }
  end() {
    this.temp.next = this.root.next
  }

  remove() {
    this.count--
    this.cur.next = this.cur.next.next;
  }
  isEnd() {
    return this.count === 1
  }
  peek() {
    return this.cur.val || this.cur.next.val;
  }
}
console.log(findTheWinner(3, 1))