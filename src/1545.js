/**
* @param {number} n
* @param {number} k
* @return {character}
*/
var findKthBit = function (n, k) {
  let curString = '0'
  for (let i = 0; i < n - 1; i++) {
    let newStr = ''
    for (let j = curString.length - 1; j >= 0; j--) {
      newStr += curString[j] === '0' ? '1' : '0'
    }
    curString = curString + '1' + newStr
  }
  return curString[k - 1]
};
console.log(findKthBit(3, 1))