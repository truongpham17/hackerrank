/**
 * @param {number[]} cards
 * @return {number}
 */
var minimumCardPickup = function (cards) {
  const pos = new Map();
  let min = 10 ** 6
  for (let i = 0; i < cards.length; i++) {
    const v = cards[i]
    if (pos.has(v)) {
      if (i - pos.get(v) < min) {
        min = i - pos.get(v)
      }
    }
    pos.set(v, i)
  }
  return min === 10 ** 6 ? -1 : min + 1
};
console.log(minimumCardPickup([3, 4, 2, 3, 4, 7]))