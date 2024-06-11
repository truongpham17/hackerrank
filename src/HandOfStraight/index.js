// https://leetcode.com/problems/hand-of-straights/?envType=daily-question&envId=2024-06-10
// MEDIUM
/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  const map = new Map();
  for (const h of hand) {
    if (map.has(h)) {
      map.set(h, map.get(h) + 1)
    } else {
      map.set(h, 1)
    }
  }

  let groupCount = 0;
  let index = 0;
  hand.sort((a, b) => a - b)

  while (groupCount < hand.length / groupSize && index < hand.length) {
    if (map.get(hand[index]) > 0) {
      for (let i = hand[index]; i < hand[index] + groupSize; i++) {
        if (map.get(i) > 0) {
          map.set(i, map.get(i) - 1)
        } else {
          return false;
        }
      }
    } else {
      index++;
    }
  }
  return true;
};
console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3))

// ----
//  ----
//   ----