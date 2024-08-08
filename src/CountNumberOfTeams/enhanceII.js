// TAG: fenwick tree
// https://leetcode.com/problems/count-number-of-teams/
// MEDIUM
/**
 * @param {number[]} rating
 * @return {number}
 */
var numTeams = function (rating) {
  const combine = rating.map((value, index) => [value, index])
  combine.sort((a, b) => a[0] - b[0])
  const rank = Array(rating.length).fill(0)

  for (let i = 0; i < combine.length; i++) {
    rank[combine[i][1]] = i + 1
  }

  class Fenwick {
    tree
    constructor(arr) {
      this.tree = Array(arr.length + 1).fill(0)
    }

    query(x) {
      let j = x + 1;
      let sum = 0
      while (j > 0) {
        sum += this.tree[j]
        j -= j & (-j)
      }
      return sum
    }

    update(x, delta) {
      let j = x + 1;
      while (j < this.tree.length) {
        this.tree[j] += delta;
        j += j & (-j)
      }
    }
  }
  let result = 0

  const lTree = new Fenwick(rank)
  const rTree = new Fenwick(rank)

  for (const x of rank) {
    rTree.update(x, 1)
  }

  for (let i = 0; i < rank.length; i++) {
    const x = rank[i]
    rTree.update(x, -1) // remove x from right tree
    const lLess = lTree.query(x - 1)
    const lLarger = i - lLess

    const rLess = rTree.query(x - 1)
    const rLarger = rank.length - i - rLess - 1
    result += lLess * rLarger + lLarger * rLess
    // add x to the left tree
    lTree.update(x, 1)
  }
  return result
};
console.log(numTeams([2, 1, 3]))