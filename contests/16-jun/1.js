/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  let sum = 0;
  const map = new Map();
  for (const h of hours) {
    const d = h % 24;
    if (map.has(d)) {
      map.set(d, map.get(d) + 1)
    } else {
      map.set(d, 1)
    }
  }
  let result = 0;

  for (let i = 1; i <= 11; i++) {
    const start = map.get(i);
    const end = map.get(24 - i);
    if(start && end ) {
      result += start * end
    }
  }
  const zero = map.get(0);
  const middle = map.get(12);

  if(zero) {
    result += zero * (zero - 1) / 2
  }
  if(middle) {
    result += middle * (middle - 1) / 2
  }
  return result
};


console.log(countCompleteDayPairs([21, 19, 3]))