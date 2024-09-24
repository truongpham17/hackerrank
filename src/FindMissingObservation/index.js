/**
 * @param {number[]} rolls
 * @param {number} mean
 * @param {number} n
 * @return {number[]}
 */
var missingRolls = function (rolls, mean, n) {
  const totalKnown = rolls.reduce((a, b) => a + b, 0)
  const totalObs = rolls.length + n
  const total = mean * totalObs - totalKnown
  const rs = []

  if (n * 6 + totalKnown < mean * totalObs) {
    return []
  }
  if (n * 1 + totalKnown > mean * totalObs) {
    return []
  }
  let sum = 0;
  // x * 6 + y = total
  // x + y = n -> y = n - x
  while (rs.length * 6 + 5 + n - rs.length < total) {
    rs.push(6)
    sum += 6
  }
  const l = rs.length
  for (let i = 0; i < n - l - 1; i++) {
    rs.push(1)
    sum += 1
  }

  if (total > sum) {
    rs.push(total - sum)
  }

  return rs
};
console.log(missingRolls([3, 2, 4, 3], 4, 2))
console.log(missingRolls([1, 5, 6], 3, 4))
console.log(missingRolls([1, 2, 3, 4], 6, 4))
console.log(missingRolls([1], 3, 1))