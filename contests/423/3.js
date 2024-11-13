/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfGoodSubsequences = function (nums) {
  const n = nums.length;
  const c = Array(n).fill(1)
  const s = Array.from({ length: n }, (_, k) => nums[k])
  //establish connection
  const pos = Array(n + 1)
  const MOD = 10 ** 9 + 7
  const memoizeC = new Map();
  const memoizeS = new Map();
  for (let i = n - 1; i >= 0; i--) {
    const value = nums[i]
    if (!pos[value]) {
      pos[value] = []
    }
    pos[value].push(i)
    if (memoizeC.has(value + 1)) {
      const cValue = memoizeC.get(value + 1)
      const sValue = memoizeS.get(value + 1)
      s[i] = (s[i] + cValue * nums[i] + sValue) % MOD
      c[i] = (c[i] + cValue) % MOD
    } else {
      if (pos[value + 1]) {
        for (const j of pos[value + 1]) {
          s[i] = (s[i] + c[j] * nums[i] + s[j]) % MOD
          c[i] = (c[i] + c[j]) % MOD
        }
      }
    }

    if (memoizeC.has(value - 1)) {
      const cValue = memoizeC.get(value - 1)
      const sValue = memoizeS.get(value - 1)
      s[i] = (s[i] + cValue * nums[i] + sValue) % MOD
      c[i] = (c[i] + cValue) % MOD
    } else {

      if (pos[value - 1]) {
        for (const j of pos[value - 1]) {
          s[i] = (s[i] + c[j] * nums[i] + s[j]) % MOD
          c[i] = (c[i] + c[j]) % MOD
        }
      }
    }

    memoizeC.set(value, c[i] + (memoizeC.get(value) || 0))

    memoizeS.set(value, s[i] + (memoizeS.get(value) || 0))
  }

  let rs = 0;
  for (let i = 0; i < n; i++) {
    rs = (rs + s[i]) % MOD
  }
  return rs
};

console.log(sumOfGoodSubsequences([6, 7, 7]))