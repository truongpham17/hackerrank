/**
 * @param {number[]} enemyEnergies
 * @param {number} currentEnergy
 * @return {number}
 */
var maximumPoints = function (enemyEnergies, currentEnergy) {
  let min = 10 ** 10;
  let total = 0
  for (const e of enemyEnergies) {
    if (e < min) {
      min = e
    }
    total += e
  }
  total -= min;
  if(currentEnergy < min) {
    return 0
  }
  const totalEnergy = currentEnergy + total;
  return Math.floor(totalEnergy / min)
};
console.log(maximumPoints([3, 2, 2], 2))