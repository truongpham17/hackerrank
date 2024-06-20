// https://leetcode.com/problems/sum-of-square-numbers/?envType=daily-question&envId=2024-06-19
// MEDIUM
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
    const breakPoint = Math.sqrt(c/2);
    for(let a = 0; a <= breakPoint; a++) {
      const b = Math.sqrt(c-a**2);
      if(b === Math.floor(b)) {
        return true;
      }
    }
    return false
};