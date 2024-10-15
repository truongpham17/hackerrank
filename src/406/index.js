/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  const push = (arr, index, value) => {
    const temp = arr.splice(0, index)
    temp.push(value)
    temp.push(...arr)
    return temp
  }

  people.sort((a, b) => a[1] === b[1] ? b[0] - a[0] : a[1] - b[1])

  let rs = []
  
  for (const p of people) {
    let count = 0;
    let i = 0
    while (count < p[1] && i < rs.length) {
      if (rs[i][0] >= p[0]) {
        count++
      }
      i++
      if (count === p[1]) {
        while (i < rs.length && rs[i][0] === p[0]) {
          i++
        }
      }

    }
    rs = push(rs, i, p)
  }
  return rs
};
console.log(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]))