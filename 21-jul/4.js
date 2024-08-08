/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var minimumOperations = function (nums, target) {
  class SparseTable {
    constructor(arr) {
      this.arr = arr;
      this.n = arr.length;
      this.log = [];
      this.st = [];

      this.buildLog();
      this.buildSparseTable();
    }

    buildLog() {
      this.log[1] = 0;
      for (let i = 2; i <= this.n; i++) {
        this.log[i] = this.log[Math.floor(i / 2)] + 1;
      }
    }

    buildSparseTable() {
      const K = this.log[this.n] + 1;
      this.st = new Array(this.n).fill(0).map(() => new Array(K).fill(0));

      for (let i = 0; i < this.n; i++) {
        this.st[i][0] = i;
      }

      for (let j = 1; j <= this.log[this.n]; j++) {
        for (let i = 0; i + (1 << j) <= this.n; i++) {
          const left = this.st[i][j - 1];
          const right = this.st[i + (1 << (j - 1))][j - 1];
          this.st[i][j] = (this.arr[left] < this.arr[right]) ? left : right;
        }
      }
    }

    query(left, right) {
      const j = this.log[right - left + 1];
      const leftIndex = this.st[left][j];
      const rightIndex = this.st[right - (1 << j) + 1][j];
      return (this.arr[leftIndex] < this.arr[rightIndex]) ? leftIndex : rightIndex;
    }
  }

  const diff = []
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    diff.push(target[i] - nums[i])
  }
  let table = new SparseTable(diff)

  function findRange(a, b, prevFind) {
    if (a > b) return;
    const minIndex = table.query(a, b)
    const minValue = diff[minIndex]
    const diffValue = minValue - prevFind;
    if (diffValue > 0) {
      result += diffValue;
      findRange(a, minIndex - 1, prevFind + diffValue)
      findRange(minIndex + 1, b, prevFind + diffValue)
    } else {
      findRange(a, minIndex - 1, prevFind)
      findRange(minIndex + 1, b, prevFind)
    }
  }

  findRange(0, nums.length - 1, 0)


  for (let i = 0; i < nums.length; i++) {
    diff[i] = -diff[i]
  }

  table = new SparseTable(diff)
  findRange(0, nums.length - 1, 0)

  return result
};
console.log(minimumOperations([9, 2, 6, 10, 4, 8, 3, 4, 2, 3],
  [9, 5, 5, 1, 7, 9, 8, 7, 6, 5]))