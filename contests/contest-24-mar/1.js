/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function (s) {
  const map = new Map();
  let left = 0;
  let right = 1;
  let maxLength = 1;
  map.set(s[0], 1)
  while (right < s.length) {
    if (!map.has(s[right])) {
      map.set(s[right], 1)
      maxLength = Math.max(maxLength, right - left + 1)
      right++;
      continue;
    }

    if (map.get(s[right]) < 2) {
      map.set(s[right], 2)
      maxLength = Math.max(maxLength, right - left + 1)
      right++
      continue;
    }

    if (map.get(s[left]) === 2) {
      map.set(s[left], 1)
    } else {
      map.delete(s[left]);
    }
    left++;
  }
  return maxLength
};
maximumLengthSubstring("bcbbbcba")