/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  const keys = [];
  power.sort((a, b) => a - b);
  const map = new Map();
  const count = new Map();
  for (const p of power) {
    if (count.has(p)) {
      count.set(p, count.get(p) + 1)
    } else {
      count.set(p, 1)
    }
  }
  let result = 0;
  for (const p of count.keys()) {
    const value = p * count.get(p);

    const lastKey = p - 1;
    const prevP = findMinHigher(keys, lastKey);

    let max = 0;

    if (prevP === -1) {
      map.set(p, value);
    } else {
      // take the prev
      max = Math.max(map.get(prevP));
      if (prevP < p - 2) {
        // prev less than p - 2, take p
        max += value
      } else {
        // take the p - 3 + p
        const prevWithP = findMinHigher(keys, p - 3);
        if (prevWithP !== -1) {
          max = Math.max(map.get(prevWithP) + value, max)
        }
      }

      max = Math.max(max, value)

      map.set(p, max);
    }

    keys.push(p)

    if (map.get(p) > result) {
      result = map.get(p)
    }
  }

  return result
};


function findMinHigher(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let result = -1; // Initialize result to -1, indicating no valid element found initially

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] <= target) {
      if (arr[mid] === target) {
        return arr[mid]
      }
      result = arr[mid]; // Potential answer found
      low = mid + 1;     // Search in the right half for a larger element that is still <= target
    } else {
      high = mid - 1;    // Search in the left half for smaller elements
    }
  }
  return result;
}

console.log(maximumTotalDamage([7, 1, 6, 3]))