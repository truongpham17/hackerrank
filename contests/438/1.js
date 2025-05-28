// Precomputed small binomials mod 5 for n=0..4 (note: binom(4,2)=6≡1 mod5)
const smallBinomMod5 = [
  [1],            // n = 0: [1]
  [1, 1],         // n = 1: [1, 1]
  [1, 2, 1],      // n = 2: [1, 2, 1]
  [1, 3, 3, 1],   // n = 3: [1, 3, 3, 1]
  [1, 4, 1, 4, 1] // n = 4: [1, 4, 1, 4, 1]
];

// Lucas theorem for computing binom(n, k) mod 5.
function lucasMod5(n, k) {
  let res = 1;
  while (n > 0 || k > 0) {
    let nd = n % 5;
    let kd = k % 5;
    if (kd > nd) return 0; // binom(nd, kd) is zero if kd > nd.
    res = (res * smallBinomMod5[nd][kd]) % 5;
    n = Math.floor(n / 5);
    k = Math.floor(k / 5);
  }
  return res;
}

// For mod 2, binom(N, k) is 1 if every 1-bit in k is also set in N.
function binomMod2(N, k) {
  return ((k & ~N) === 0) ? 1 : 0;
}

// Precomputed CRT lookup table for combining a result mod2 (row index)
// and a result mod5 (column index) into a unique digit mod 10.
const CRT = [
  [0, 6, 2, 8, 4], // When mod2 result is 0.
  [5, 1, 7, 3, 9]  // When mod2 result is 1.
];

function hasSameDigits(s) {
  // If s is already of length 2 or less, simply return s.
  if (s.length <= 2) return s;

  const n = s.length;
  const N = n - 2; // Number of rounds = s.length - 2.
  
  // Convert s into an array of digit numbers.
  const digits = s.split('').map(ch => ch.charCodeAt(0) - 48);
  
  let first = 0;
  let second = 0;
  
  // Loop over i = 0 to N.
  // The final first digit is: sum_{i=0}^{N} binom(N, i)*digits[i] mod 10,
  // and the final second digit uses digits[i+1].
  for (let i = 0; i <= N; i++) {
    // Compute binom(N, i) mod 2 and mod 5.
    const b2 = binomMod2(N, i);
    const b5 = lucasMod5(N, i);
    // Combine via our CRT table.
    const coeff = CRT[b2][b5];
    
    // Add contribution to the first digit (i from 0 to n-2).
    first = (first + coeff * digits[i]) % 10;
    // Add contribution to the second digit (i+1 from 1 to n-1).
    if (i + 1 < n) {
      second = (second + coeff * digits[i + 1]) % 10;
    }
  }
  return `${first}${second}`;
}

// Example usage:
console.log(has("12345")); // For example, might output "08"
