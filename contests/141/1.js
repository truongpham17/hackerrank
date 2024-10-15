/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
  const getNext = (c) => {
    if (c === 'z') return 'a'
    return String.fromCharCode(c.charCodeAt(0) + 1)
  }
  let str = 'a'
  while (str.length < k) {
    const l = str.length
    for (let i = 0; i < l; i++) {
      str += getNext(str[i])
    }
  }
  return str[k - 1]
};
console.log(kthCharacter(5))