/**
 * @param {number} n
 * @return {number[]}
 */
var constructDistancedSequence = function (n) {
  const find = (n) => {
    const space = Array(n * 2 - 1).fill(0)
    let min = null
    const compare = (space) => {
      if (!min) {
        min = space.join("")
      } else {
        min = space;
      }
    }
    const findNext = (n) => {
      if (n === 1) {
        for (let i = 0; i < space.length; i++) {
          if (!space[i]) {
            compare(space)
          }
        }
      }
    }
  }
};