const MOD = (10 ** 9) + 7

function power(x, y, p) {
  let res = 1n;
  x = x % p;
  while (y > 0n) {
    if (y & 1n) res = (res * x) % p;
    y = y >> 1n;
    x = (x * x) % p;
  }
  return res;
}

function modInverse(n, p) {
  return power(n, p - 2n, p);
}

function mul(x, y, p) {
  return (x * y) % p;
}

function divide(x, y, p) {
  return mul((x), modInverse((y), (p)), (p));
}

function nCrModPFermat(n, r, p) {
  n = BigInt(n);
  r = BigInt(r);
  p = BigInt(p);
  if (n < r) return 0;
  if (r === 0n) return 1;
  if (n - r < r) return nCrModPFermat(n, n - r, p);
  let res = 1n;
  for (let i = 1n; i <= r; i++) {
    res = divide(mul(res, n - i + 1n, p), i, p);
  }
  return Number(res);
}
console.log(nCrModPFermat(10, 3, MOD))
