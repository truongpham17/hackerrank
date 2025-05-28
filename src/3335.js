/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformations = function (s, t) {
  // after 26 -> 1 round -> add one more character
  const step = new Array(10 ** 5 + 1).fill(0)
  for (let i = 0; i < s.length; i++) {
    step[123 - s.charCodeAt(i)]++
  }
  let rs = s.length;

  const MOD = 10 ** 9 + 7

  for (let i = 1; i <= t; i++) {
    if (step[i]) {
      rs = (rs + step[i]) % MOD
      step[i + 25] = (step[i + 25] + step[i]) % MOD
      step[i + 26] = (step[i + 26] + step[i]) % MOD
    }
  }
  return rs
};
console.log(lengthAfterTransformations("abcyy", 2))