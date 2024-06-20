/**
 * @param {number[]} bloomDay
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var minDays = function (bloomDay, m, k) {
  let max = 0;
  let min = 10 ** 10
  for (const b of bloomDay) {
    if (max < b) {
      max = b
    }
    if (min > b) {
      min = b
    }
  }

  function countBouquet(day) {
    let curAdj = 0;
    let result = 0;
    for (const value of bloomDay) {
      if (value <= day) {
        curAdj++
      } else {
        result += Math.floor(curAdj / k);
        curAdj = 0
      }
    }
    result += Math.floor(curAdj / k);
    return result;
  }

  let result = -1;
  while (min <= max) {
    const middle = Math.floor((min + max) / 2);
    const count = countBouquet(middle);
    if (count >= m) {
      result = middle;
      max = middle - 1;
    } else {
      min = middle + 1;
    }
  }
  return result
};
console.log(minDays([7,7,7,7,12,7,7], 2, 3))