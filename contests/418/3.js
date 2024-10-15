/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var constructGridLayout = function (n, edges) {
  const count = Array(n).fill(0)
  const connect = {}

  for (let i = 0; i < n; i++) {
    connect[i] = []
  }
  for (const [a, b] of edges) {
    count[a]++
    count[b]++
    connect[a].push(b)
    connect[b].push(a)
  }
  let max = 0;
  let min = 10
  for (const x of count) {
    if (x > max) {
      max = x
    }
    if (x < min) {
      min = x
    }
  }
  const findAppearK = (k, est) => {
    const rs = []
    for (let i = 0; i < n; i++) {
      if (connect[i].length === k) {
        rs.push(i)
        if (rs.length === est) return rs
      }
    }
  }

  const checked = new Set()
  // one line
  if (min === 1) {
    const rs = []
    const ones = findAppearK(1, 2)
    rs.push(ones[0])
    let temp = ones[0]
    checked.add(ones[0])
    while (temp !== ones[1]) {
      const [a, b] = connect[temp]
      let next = checked.has(a) ? b : a
      temp = next;
      rs.push(temp)
      checked.add(temp)
    }
    return rs
  }

  if (min === 2 && max === 2) {
    const rs = [[0, connect[0][1]], [connect[0][0]]]
    const set = new Set()
    set.add(0)
    set.add(connect[0][1])
    set.add(connect[0][0])
    for (let i = 0; i < 4; i++) {
      if (!set.has(i)) {
        rs[1].push(i)
      }
    }
    return rs

  }

  // two lines
  if (max === 3) {
    const twos = findAppearK(2, 4)
    const nextToTwoZero = twos.find(x => connect[twos[0]].includes(x))
    const rs = [[twos[0]], [nextToTwoZero]]
    checked.add(rs[0][0])
    checked.add(rs[1][1])
    for (let i = 1; i < n / 2; i++) {
      const nextFirstLine = connect[rs[0][i - 1]].find(i => !checked.has(i))
      rs[0].push(nextFirstLine)
      const nextSecLine = connect[rs[1][i - 1]].find(i => !checked.has(i))
      rs[1].push(nextSecLine)
      checked.add(nextFirstLine)
      checked.add(nextSecLine)
    }
    return rs
  }

  // more than 2 lines
  // most diff
  const [_1, _2, _3, _4] = findAppearK(2, 4)

  const rs = [[0]]
  rs[0][0] = _1
  let temp = _1
  checked.add(temp)



  const build = ([x, y], [sX, sY]) => {
    let temp = rs[sX][sY]
    checked.add(temp)
    checkPoint = temp
    while (temp === checkPoint || (connect[temp].length === 3)) {
      const first = connect[temp].find(x => !checked.has(x) && connect[x].length <= 3)
      if (first === undefined) break
      sX += x
      sY += y
      if (!rs[sX]) {
        rs.push([])
      }
      rs[sX][sY] = first;
      checked.add(temp)
      temp = first
    }
  }
  build([0, 1], [0, 0])
  build([1, 0], [0, rs[0].length - 1])
  build([0, -1], [rs.length - 1, rs[0].length - 1])
  build([-1, 0], [rs.length - 1, 0])
  
};
// console.log(constructGridLayout(5, [[0, 1], [1, 3], [2, 3], [2, 4]]))
// console.log(constructGridLayout(4, [[0, 1], [0, 2], [1, 3], [2, 3]]))
// console.log(constructGridLayout(8, [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [3, 7],
//   [7, 6],
//   [2, 6],
//   [6, 5],
//   [1, 5],
//   [0, 4],
//   [5, 4]
// ]))
console.log(constructGridLayout(9, [[0, 1], [0, 4], [0, 5], [1, 7], [2, 3], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [6, 8], [7, 8]]))