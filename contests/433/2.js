/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSums = function (nums, k) {
  const MOD = (10 ** 9) + 7

  function power(x, y, p) {
    let res = 1n; // Initialize result as BigInt

    x = BigInt(x) % BigInt(p); // Update x if it is more than or equal to p

    while (y > 0n) {
      // If y is odd, multiply x with result
      if (y & 1n) res = (res * x) % BigInt(p);

      // y must be even now
      y = y >> 1n; // y = y / 2
      x = (x * x) % BigInt(p);
    }
    return res;
  }

  // Returns n^(-1) mod p
  function modInverse(n, p) {
    return power(BigInt(n), BigInt(p) - 2n, BigInt(p));
  }

  function mul(x, y, p) {
    return (BigInt(x) * BigInt(y)) % BigInt(p);
  }

  function divide(x, y, p) {
    return mul(BigInt(x), modInverse(BigInt(y), BigInt(p)), BigInt(p));
  }

  const map = new Map();
  const toId = (n, r) => Number(n) * 10001 + Number(r)
  // Returns nCr % p using Fermat's little theorem.
  function nCrModPFermat(n, r, p) {
    const id = toId(n, r)
    if (map.has(id)) {
      return map.get(id)
    }

    n = BigInt(n);
    r = BigInt(r);
    p = BigInt(p);

    // If n < r, return 0
    if (n < r) return 0;
    // Base case
    if (r === 0n) return 1;
    // Use nCr = nC(n-r) when n-r < r
    if (n - r < r) return nCrModPFermat(n, n - r, p);

    let res = 1n;
    // Keep multiplying numerator terms and dividing denominator terms in res
    for (let i = 1n; i <= r; i++) {
      res = divide(mul(res, n - i + 1n, p), i, p);
    }
    map.set(id, Number(res))
    return Number(res);
  }

  nums.sort((a, b) => a - b)

  let rs = 0;

  for (let i = 0; i < nums.length; i++) {
    rs += (nums[i] * 2) % MOD
    for (let j = 2; j <= k; j++) {
      if (i + j - 1 < nums.length) {
        rs += (nums[i] % MOD) * (nCrModPFermat(nums.length - i - 1, j - 1, MOD) % MOD)
        rs %= MOD
      }

      if (i - j + 1 >= 0) {
        rs += (nums[i] % MOD) * (nCrModPFermat(i, j - 1, MOD) % MOD)
        rs %= MOD
      }
    }
  }
  return rs
}

// console.log(minMaxSums([1, 2, 3], 2))

console.log(minMaxSums([5, 0, 6], 1))