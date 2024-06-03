/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function (energy, k) {
  const map = new Map();
  const maxMap = new Map();
  for (let i = 0; i < k; i++) {
    map.set(i, 0)
    maxMap.set(i, - (10 ** 10));
  }
  for (let i = energy.length - 1; i >= 0; i--) {
    map.set(i % k, map.get(i % k) + energy[i])
    maxMap.set(i % k, Math.max(maxMap.get(i % k), map.get(i % k)))
  }
  let max = -(10 ** 10);
  for (const v of maxMap.values()) {
    max = Math.max(max, v)
  }
  return max
};
console.log(maximumEnergy([-2, 3, -1, 5], 2))