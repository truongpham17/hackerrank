/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function (start, goal) {
  let a = start.toString(2)
  let b = goal.toString(2)
  let temp = ''
  const abs = Math.abs(a.length - b.length)
  for (let i = 0; i < abs; i++) {
    temp += '0'
  }
  if (a.length < b.length) {
    a = temp + a
  } else if (a.length > b.length) {
    b = temp + b
  }
  let rs = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      rs++
    }
  }
  return rs
};