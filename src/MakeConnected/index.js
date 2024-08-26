// MEDIUM 
// https://leetcode.com/problems/number-of-operations-to-make-network-connected/submissions/1348424839/
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1
  const parents = Array(n).fill(-1)
  const ranks = new Map()

  const findParent = (i) => {
    if (parents[i] === -1 || parents[i] === i) return parents[i]
    const parent = findParent(parents[i])
    parents[i] = parent;
    return parent
  }

  const join = (i, j) => {
    const parentI = findParent(i)
    const parentJ = findParent(j)
    const rankI = ranks.get(parentI)
    const rankJ = ranks.get(parentJ)
    if (rankI < rankJ) {
      parents[parentI] = parentJ
      ranks.delete(parentI)
      return parentJ
    }
    if (rankI > rankJ) {
      parents[parentJ] = parentI
      ranks.delete(parentJ)
      return parentI
    }

    parents[parentI] = parentJ
    ranks.delete(parentI)
    ranks.set(parentJ, rankJ + 1)
    return parentJ
  }

  let count = 0;

  for (const [a, b] of connections) {
    const parentA = findParent(a)
    const parentB = findParent(b)
    // not found both a and b
    if (parentA === -1 && parentB === -1) {
      parents[a] = a
      parents[b] = a
      ranks.set(a, ranks.get(a) + 2)
      continue
    }

    // find B not A
    if (parentA === -1 && parentB !== -1) {
      // add a to b
      parents[a] = parentB
      continue
    }

    if (parentA !== -1 && parentB === -1) {
      // add b to a
      parents[b] = parentA
      continue
    }
    // find both a & b
    join(a, b)
  }


  let pivotParent = findParent(0)
  if (pivotParent === -1) {
    parents[0] = 0;
    pivotParent = 0;
  }

  for (let i = 1; i < n; i++) {
    if (findParent(i) !== pivotParent) {
      count++
      pivotParent = join(i, pivotParent)
    }
  }
  return count
};

console.log(makeConnected(11, [[1, 4], [0, 3], [1, 3], [3, 7], [2, 7], [0, 1], [2, 4], [3, 6], [5, 6], [6, 7], [4, 7], [0, 7], [5, 7]]))