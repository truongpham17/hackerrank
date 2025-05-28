/**
 * @param {number[]} groups
 * @param {number[]} elements
 * @return {number[]}
 */
var assignElements = function (groups, elements) {
  const map = new Map();
  for (let i = 0; i < elements.length; i++) {
    if (!map.has(elements[i])) {
      map.set(elements[i], i)
    }
  }
  const rs = []
  for (const val of groups) {
    let temp = 100000
    for (let i = 1; i <= Math.sqrt(val); i++) {
      if (val % i === 0) {
        if (map.has(i)) {
          temp = Math.min(temp, map.get(i))
        }
        if (map.has(val / i)) {
          temp = Math.min(temp, map.get(val / i))
        }
      }
    }
    rs.push(temp === 100000 ? -1 : temp)
  }
  return rs
};
console.log(assignElements([8, 4, 3, 2, 4], [4, 2]))