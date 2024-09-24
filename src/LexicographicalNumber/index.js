// MEDIUM
// https://leetcode.com/problems/lexicographical-numbers/description/?envType=daily-question&envId=2024-09-21
/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
  const rs = []
  let number = 1
  while (true) {
    if (number > n) {
      number = (number - number % 10) / 10;
      number++
      while (number % 10 === 0) {
        number /= 10
      }
      if (number === 1) break
    } else {
      rs.push(number)
      if (number * 10 <= n) {
        number *= 10
      } else {
        number++
        while (number % 10 === 0) {
          number /= 10
        }
        if (number === 1) break
      }
    }
  }
  return rs
};
console.log(lexicalOrder(130))