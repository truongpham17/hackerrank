// source: https://leetcode.com/problems/integer-break/
// Difficulty level: MEDIUM
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  function count(n) {
    if (n <= 4) {
      switch (n) {
        case 2:
          return 1;
        case 3:
          return 2;
        case 4:
          return 4;
      }
    }
    const mod3 = n % 3;
    if (mod3 === 0) return 3 ** (n / 3);
    if (mod3 === 1) return 3 ** (Math.floor(n / 3) - 1) * 4;
    return 3 ** Math.floor(n / 3) * 2;
  }
  const result = [0, 0];
  for (let i = 2; i <= 58; i++) {
    result.push(count(i));
  }
  return result;
};

console.log(integerBreak(6));
