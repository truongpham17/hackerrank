// Difficulty level: MEDIUM
// source: https://leetcode.com/problems/remove-duplicate-letters/
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // can be remove or not = 0
  // must be remove = 1
  // must be included = 2
  const map = new Map();
  for (const char of s) {
    if (!map.has(char)) {
      map.set(char, { count: 1, status: 2 });
    } else {
      const data = map.get(char);
      data.count++;
      data.status = 0;
    }
  }
  let i = 0;
  let result = '';
  while (i < s.length) {
    const data = map.get(s[i]);
    if (data.status === 1) {
      i++;
      continue;
    }
    if (data.status === 2) {
      result += s[i];
      i++;
      continue;
    }

    // data = 0;
    // find the next item if it can be remove or it is smaller than s[i], if find something can't be remove, break immediately
    let j = i + 1;
    let countLeft = data.count;
    while (j < s.length) {
      if (s[i] === s[j]) {
        countLeft--;
        if (countLeft === 1) break;
      }
      if (s[j] < s[i] && map.get(s[j]).status !== 1) break;
      if (map.get(s[j]).status === 2) break;
      j++;
    }
    // if j is in scope and s[j] < s[i] and s[j] is available then from s[i] -> s[j - 1] => exclude them all,
    //and add s[j] to the result
    if (j < s.length && s[j] < s[i] && map.get(s[j]).status !== 1) {
      // result += s[j];
      // i = j + 1;
      // map.get(s[j]).status = 1;
      for (let k = i; k < j; k++) {
        const kValue = map.get(s[k]);
        kValue.count--;
        if (kValue.count <= 1) {
          kValue.status = 2;
        }
      }
      i = j;
      continue;
    }
    // if can not find any thing fix the constraint, add s[i] to the result
    result += s[i];
    map.get(s[i]).status = 1;
    i++;
  }
  return result;
};
/**
 * bcabc
 * from [i..j] find smaller char that has not been remove?
 * s[i] mean the smallest character from i to current pivot
 * n = 10^4
 * nlogn
 *
 */
console.log(removeDuplicateLetters('bccab'));
