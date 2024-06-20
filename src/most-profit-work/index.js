// https://leetcode.com/problems/most-profit-assigning-work/
// MEDIUM
/**
 * @param {number[]} difficulty
 * @param {number[]} profit
 * @param {number[]} worker
 * @return {number}
 */
var maxProfitAssignment = function (difficulty, profit, worker) {
  const merged = []
  for (const i in difficulty) {
    merged.push({
      d: difficulty[i],
      p: profit[i]
    })
  }

  merged.sort((a, b) => a.d - b.d);

  worker.sort((a, b) => a - b)
  let result = 0;
  let temp = 0;
  const heap = new MaxHeap();
  for (const w of worker) {
    while (temp < merged.length && w >= merged[temp].d) {
      heap.addHeap(merged[temp].p)
      temp++;
    }
    result += heap.pop();
  }
  return result
};

class MaxHeap {
  arr = []
  addHeap(item) {
    this.arr.push(item)
    this.bubbleUp(this.arr.length - 1)
  }
  pop() {
    const arr = this.arr;
    if (arr.length > 0) {
      const result = arr[0];
      // arr[0] = arr[arr.length - 1];
      // arr.length = arr.length - 1;
      return result
    } else {
      return 0
    }
  }
  leftChild(index) {
    return index * 2 + 1
  }
  rightChild(index) {
    return index * 2 + 2
  }
  parent(index) {
    return Math.round((index - 1) / 2)
  }
  swap(a, b) {
    const temp = this.arr[a];
    this.arr[a] = this.arr[b];
    this.arr[b] = temp;
  }

  bubbleUp(index) {
    const parent = this.parent(index);
    const arr = this.arr
    if (arr[parent] < arr[index]) {
      this.swap(parent, index);
      this.bubbleUp(parent);
    }
  }
}

console.log(maxProfitAssignment([13, 37, 58], [4, 90, 96], [34, 73, 45]))