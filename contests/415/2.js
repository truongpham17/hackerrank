/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
  const n = b.length
  const v = Array.from({ length: 4 }, () => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    v[0][i] = b[i] * a[0]
  }

  for (let i = 1; i < 4; i++) {
    let prevMax = v[i - 1][i - 1]
    for (let j = i; j < n; j++) {
      prevMax = Math.max(prevMax, v[i - 1][j - 1])
      v[i][j] = a[i] * b[j] + prevMax //max(v[i-1][0]..v[i-1][j-1])
    }
  }
  let rs = -(10 ** 10)
  for (let i = n - 1; i >= n - 1 - (b.length - 4); i--) {
    rs = Math.max(rs, v[3][i])
  }
  return rs
};

console.log(maxScore([3, 2, 5, 6], [2, -6, 4, -5, -3, 2, -7]))
console.log(maxScore([-1, 4, 5, -2], [-5, -1, -3, -2, -4]))