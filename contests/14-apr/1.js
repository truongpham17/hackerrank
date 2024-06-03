/**
 * @param {string} s
 * @return {string}
 */
var findLatestTime = function (s) {
  let newString = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '?') {
      newString += s[i]
    } else {
      if (i === 0) {
        if (s[1] === '?' || Number(s[1]) < 2) {
          newString += '1'
        } else {
          newString += '0'
        }
      } else if (i === 1) {
        if (newString[0] === '0') {
          newString += '9'
        } else {
          newString += '1'
        }
      } else if (i === 3) {
        newString += '5'
      } else if (i === 4) {
        newString += '9'
      }
    }
  }
  return newString
};
console.log(findLatestTime('1?:?4'))
console.log(findLatestTime('0?:5?'))
console.log(findLatestTime('??:??'))
console.log(findLatestTime('11:58'))
console.log(findLatestTime('00:?8'))