/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  const map = {
    5: 0,
    10: 0,
  }
  for (const bill of bills) {
    if (bill === 5) {
      map[5]++
    } else if (bill === 10) {
      map[5]--
      map[10]++
    } else if (bill === 20) {
      if (map[10] > 0) {
        map[10]--
        map[5]--
      } else {
        map[5] -= 3
      }
    }
    if (map[5] < 0) return false
  }
  return true
};
console.log(lemonadeChange([5, 5, 5, 10, 20]))