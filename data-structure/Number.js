
// base**exp % mod
function modExp(base, exp, mod) {
  let result = 1;
  base = base % mod;

  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}


// (a * b) % c
function modMult(a, b, mod) {
  let result = 0;
  a = a % mod;

  while (b > 0) {
    // If b is odd, add a to result (mod mod)
    if (b % 2 === 1) {
      result = (result + a) % mod;
    }

    // Double a and halve b for the next iteration
    a = (a * 2) % mod;
    b = Math.floor(b / 2);
  }

  return result;
}
