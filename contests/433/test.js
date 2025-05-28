function power(x, y, p) {
  let res = 1n; // Initialize result as BigInt
  x = BigInt(x) % BigInt(p); // Convert x and p to BigInt

  while (y > 0) {
    if (y & 1) res = (res * x) % BigInt(p); // If y is odd, multiply x with result
    y = y >> 1; // y = y / 2 (y remains a regular number)
    x = (x * x) % BigInt(p); // Update x to x^2 (BigInt operations)
  }
  return res;
}

// Returns n^(-1) mod p using Fermat's Little Theorem
function modInverse(n, p) {
  if (n === 0) throw new Error("Division by zero error"); // Guard against division by zero
  return power(n, p - 2, p); // Use power function
}

function mul(x, y, p) {
  return (BigInt(x) * BigInt(y)) % BigInt(p); // Ensure multiplication and modulo use BigInt
}

function divide(x, y, p) {
  return mul(x, modInverse(y, p), p); // Division using modular inverse
}

function nCrModPFermat(n, r, p) {
  if (n < r) return 0; // If n < r, nCr is 0
  if (r === 0 || n === r) return 1; // Base cases
  if (n - r < r) r = n - r; // Use symmetry property: nCr = nC(n-r)

  let res = 1n; // Initialize result as BigInt
  for (let i = 0; i < r; i++) {
    res = mul(res, n - i, p); // Numerator term (BigInt multiplication)
    res = divide(res, i + 1, p); // Denominator term (BigInt division)
  }
  return res;
}
// console.log(nCrModPFermat(10, 2, 10 ** 9 + 7))

console.log(nCrModPFermat(1000, 500, 10 ** 9 + 7));