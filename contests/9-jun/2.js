/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var valueAfterKSeconds = function (n, k) {
  const MOD = 10 ** 9 + 7
  const s = [[]];
  for (let i = 0; i < n; i++) {
    s[0].push(1)
  }
  for (let i = 1; i <= k; i++) {
    s.push([1])
    for (let j = 1; j < n; j++) {
      s[s.length - 1].push((s[i - 1][j] + s[i][j - 1]) % MOD)
    }
  }
  return s[s.length - 1][n - 1] % MOD
};
console.log(valueAfterKSeconds(2, 1000))