/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var maxSubstringLength = function (s, k) {

  if (k === 0) {
    return true
  }

  const lastPos = Array(29).fill(-1)
  const firstPos = Array(29).fill(-1)
  const toCode = (c) => c.charCodeAt(0) - 97

  for (let i = 0; i < s.length; i++) {
    const code = toCode(s[i])
    lastPos[code] = i
    if (firstPos[code] === -1) {
      firstPos[code] = i
    }
  }

  for (let i = 0; i < 27; i++) {
    const start = firstPos[i]
    const end = lastPos[i]
    if (start === -1) continue;
    let min = start;
    let max = end;
    for (let j = start + 1; j < end; j++) {
      min = Math.min(min, firstPos[toCode(s[j])])
      max = Math.max(max, lastPos[toCode(s[j])])
    }
    firstPos[i] = min;
    lastPos[i] = max;
  }
  if (k === 1) {
    for (let i = 0; i < 27; i++) {
      if (lastPos[i] !== -1 && (firstPos[i] !== 0 || lastPos[i] !== s.length - 1)) {
        return true
      }
    }
    return false
  }

  let lastRight = -1;
  let count = 0;
  while (count < k) {
    let minRight = 10 ** 10
    for (let i = 0; i < 27; i++) {
      if (firstPos[i] > lastRight && lastPos[i] < minRight) {
        minRight = lastPos[i]
      }
    }
    if (minRight === 10 ** 10) {
      return false;
    }
    count++;

    lastRight = minRight
  }

  return true
};
console.log(maxSubstringLength("wwo", 1))