// source: https://leetcode.com/problems/repeated-substring-pattern/
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  const middlePos = Math.floor(s.length / 2);
  const dividedArray = [];

  for (let i = 1; i <= middlePos; i++) {
    if (s.length % i === 0) dividedArray.push(i);
  }

  for (let i = 0; i < dividedArray.length; i++) {
    let flag = true;
    const originalSubStr = s.slice(0, dividedArray[i]);
    for (let j = 1; j < s.length / dividedArray[i]; j++) {
      const newSubStr = s.slice(j * dividedArray[i], (j + 1) * dividedArray[i]);
      if (newSubStr !== originalSubStr) {
        flag = false;
        break;
      }
    }

    if (flag) return true;
  }
  return false;
};

console.log(repeatedSubstringPattern('abab'));
