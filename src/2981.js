/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function (s) {
  const isMatch = (index, str) => {
    for (let i = 0; i < str.length; i++) {
      if (s[index + i] !== str[i]) {
        return false
      }
    }
    return true
  }
  let curSub = ''
  let i = 0;
  let maxSubLength = -1
  while (i < s.length) {
    if (s[i] !== curSub[0]) {
      curSub = s[i]
    } else {
      curSub += s[i]
    }

    for (let j = i - curSub.length + 2; j < s.length; j++) {
      if (isMatch(j, curSub)) {
        for (let k = j + 1; k < s.length; k++) {
          if (isMatch(k, curSub)) {
            maxSubLength = Math.max(maxSubLength, curSub.length)
          }
        }
      }
    }

    i++
  }
  return maxSubLength;
};
console.log(maximumLength('aaaa'))