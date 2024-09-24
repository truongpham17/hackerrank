/**
 * @param {number} power
 * @param {number[]} damage
 * @param {number[]} health
 * @return {number}
 */
var minDamage = function (power, damage, health) {
  const count = []
  for (let i = 0; i < health.length; i++) {
    count.push({ damage: damage[i], rank: damage[i] / Math.ceil(health[i] / power), require: Math.ceil(health[i] / power) })
  }
  count.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank
    return b.require - a.require

  })

  const ps = []
  let temp = 0
  for (let i = 0; i < count.length; i++) {
    temp += count[i].damage
    ps.push(temp)
  }
  let rs = 0
  for (let i = count.length - 1; i >= 0; i--) {
    rs += count[i].require * ps[i]
  }
  return rs
};
console.log(minDamage(8, [40], [59]))