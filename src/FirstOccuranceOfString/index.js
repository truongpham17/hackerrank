/**
 * KEYWORDS: string search, Z Algorithm
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const str = needle + "$" + haystack;
  let L = 0, R = 0;
  const zArr = [0]
  const checkPass = () => {
    if (zArr[zArr.length - 1] === needle.length) {
      return zArr.length - needle.length - 2
    }
  }
  for (let i = 1; i < str.length; i++) {
    if (i > R) {
      L = i;
      R = i;
      while (str[R - L] === str[R] && R < str.length) {
        R++
      }
      zArr.push(R - L)
      R--
    } else {
      if (zArr[i - L] < R - i + 1) {
        zArr.push(zArr[i - L])
      } else {
        L = i;
        while (str[R - L] === str[R] && R < str.length) {
          R++
        }
        zArr.push(R - L)
        R--
      }
    }

    if (checkPass() !== undefined) {
      return checkPass()
    }
  }
  return - 1
};
console.log(strStr('sadbutsad', 'sad'))