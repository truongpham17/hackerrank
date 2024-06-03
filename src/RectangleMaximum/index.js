// source: https://leetcode.com/problems/maximal-rectangle/description/?envType=daily-question&envId=2024-04-13
// HARD
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function (matrix) {
  const horizontalLength = matrix[0].length;
  const hash = new Set()

  const toId = (pos) => pos.j + horizontalLength * pos.i;

  const addToHash = (pos1, pos2) => {
    const idI = toId(pos1)
    const idJ = toId(pos2)
    const id = `${idI}_${idJ}`
    hash.add(id)
  }

  const posInHash = (pos1Id, pos2Id) => {
    const id = `${pos1Id}_${pos2Id}`
    return hash.has(id)
  }

  const isTwoPosGood = (pos1, pos2) => {
    if (pos1.i > pos2.i || pos1.j > pos2.j) return false
    const pos1Id = toId(pos1)
    if (pos1.i === pos2.i) {
      const pos2Id = toId({
        i: pos2.i,
        j: pos2.j - 1
      })
      return posInHash(pos1Id, pos2Id)
    }

    if (pos1.j === pos2.j) {
      const pos2Id = toId({ i: pos2.i - 1, j: pos2.j })
      return posInHash(pos1Id, pos2Id)
    }

    const pos2Id1 = toId({ i: pos2.i, j: pos2.j - 1 })
    const pos2Id2 = toId({ i: pos2.i - 1, j: pos2.j })
    return posInHash(pos1Id, pos2Id1) && posInHash(pos1Id, pos2Id2)
  }

  const getArea = (pos1, pos2) => {
    return (Math.abs(pos1.i - pos2.i) + 1) * (Math.abs(pos1.j - pos2.j) + 1)
  }

  const posWithOnes = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '1') {
        posWithOnes.push({
          i, j
        })
      }
    }
  }

  let maxArea = posWithOnes.length > 0 ? 1 : 0

  for (const pos of posWithOnes) {
    addToHash(pos, pos)
  }

  for (let i = 0; i < posWithOnes.length; i++) {
    const pos1 = posWithOnes[i]
    for (let j = i + 1; j < posWithOnes.length; j++) {
      const pos2 = posWithOnes[j]
      if (isTwoPosGood(pos1, pos2)) {
        addToHash(pos1, pos2)
        maxArea = Math.max(maxArea, getArea(pos1, pos2))
      }
    }
  }
  return maxArea
};


console.log(maximalRectangle([["1", "0", "1", "1", "0", "1"], ["1", "1", "1", "1", "1", "1"], ["0", "1", "1", "0", "1", "1"], ["1", "1", "1", "0", "1", "0"], ["0", "1", "1", "1", "1", "1"], ["1", "1", "0", "1", "1", "1"]]))
/**
 * ["0","0","1","0"]
 * ["1","1","1","1--"]
 * ["1","1","1","1"]
 * ["1","1","1","0"]
 * ["1","1","0","0"]
 * ["1","1","1","1"]
 * ["1","1","1","0"]
 * 
 * 
 * ["1","0","1","1","0","1"]
 * ["1","1","1","1","1","1"]
 * ["0","1","1","0","1","1"]
 * ["1","1","1","0","1","0"]
 * ["0","1","1","1","1","1"]
 * ["1","1","0","1","1","1"]
 */