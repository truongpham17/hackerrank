/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var stringHash = function (s, k) {
  let rs = ''
  for (let i = 0; i < s.length / k; i++) {
    let sum = 0;
    for (let j = 0; j < k; j++) {
      const index = j + k * i
      sum += s.charCodeAt(index) - 97
    }
    sum %= 26
    sum += 97
    rs += String.fromCharCode(sum)
  }
  return rs
};
console.log(stringHash("abcd", 2))