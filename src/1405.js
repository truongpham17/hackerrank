/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {string}
 */
var longestDiverseString = function (a, b, c) {
  // while()  
  const rs = []
  const count = [[a, 'a'], [b, 'b'], [c, 'c']]

  while (count.filter(x => x[0] === 0).length < 2) {
    for (const item of count) {
      if (item[0] > 0) {
        item[0]--
        rs.push(item[1])
      }
    }
  }
  
  const left = count.find(x => x[0] > 0)

  if (!left) {
    return rs.join('')
  }

  const check = (i1, i2) => i1 < 0 || i2 >= rs.length || rs[i1] !== left[1] || rs[i2] !== left[1]

  while (left[0] > 0) {
    let found = false
    // try to check, add to index i
    for (let i = 0; i <= rs.length; i++) {
      if (check(i, i + 1) && check(i - 1, i) && check(i - 2, i - 1)) {
        rs.splice(i, 0, left[1])
        left[0]--
        found = true
        break
      }
    }
    if (!found) {
      break;
    }
  }
  return rs.join('')
};
console.log(longestDiverseString(2, 4, 1))