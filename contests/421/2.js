/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformations = function (s, t) {
  const step = Array(10 ** 5 + 1).fill(0)
  let curLength = s.length
  for (const c of s) {
    step[122 - c.charCodeAt(0)]++
  }
  const MOD = 10 ** 9 + 7
  for (let i = 0; i < t; i++) {
    if (step[i]) {
      curLength = (curLength + step[i]) % MOD
      step[i + 123 - 97] = (step[i] + step[i + 123 - 97]) % MOD
      step[i + 123 - 98] = (step[i] + step[i + 123 - 98]) % MOD
    }
  }
  return curLength
};
console.log(lengthAfterTransformations('jqktcurgdvlibczdsvnsg', 7517))
console.log(lengthAfterTransformations('abcyy', 2))
//79033769
//14999
//293718732