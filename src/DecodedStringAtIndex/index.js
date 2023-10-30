// Difficulty level: MEDIUM
// source: https://leetcode.com/problems/decoded-string-at-index/?envType=daily-question&envId=2023-09-27
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var decodeAtIndex = function (s, k) {
  let curLength = 0;
  const data = [];
  let curStr = '';
  for (const char of s) {
    if (isNaN(char)) {
      curStr += char;
    } else {
      const nChar = Number(char);
      if (curStr.length > 0) {
        curLength = (curLength + curStr.length) * nChar;
        data.push([curStr, curLength, nChar]);
        curStr = '';
      } else {
        data[data.length - 1][1] *= nChar;
        data[data.length - 1][2] *= nChar;
        curLength *= nChar;
      }
      if (curLength >= k) break;
    }
  }
  if (curStr.length > 0) {
    data.push([curStr, curLength + curStr.length, 1]);
  }

  let newK = k;

  while (data.length > 1) {
    const ref = data[data.length - 1];
    newK = newK % (ref[1] / ref[2]) || newK;
    if (newK > data[data.length - 2][1]) {
      newK = newK - data[data.length - 2][1];
      data.length = 0;
      data.push([ref[0], ref[0].length, 1]);
      continue;
    } else {
      data.pop();
    }
  }
  return data[0][0][(newK + -1) % data[0][0].length];
};

console.log(decodeAtIndex('xo78xylzu6', 342));

/**
 */
