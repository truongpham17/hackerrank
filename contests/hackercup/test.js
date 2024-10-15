function modInverse(a, mod) {
  let result = 1n;
  let power = mod - 2n;
  let base = BigInt(a);

  while (power > 0n) {
    if (power % 2n === 1n) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    power /= 2n;
  }

  return result;
}

function expectedDaysToGoal(W, G, L) {
  const MOD = 998244353n;

  // Handle cases where W is already at or below G
  if (W <= G) return 0;

  const dp = Array(W - G + L).fill(0n); // DP table for storing expected days

  for (let i = W - 1; i >= G; i--) {
    let days = 0n;
    if (i < W - L) {
      // Normal case, free to increase or decrease weight
      days = (dp[i - G + 1] + dp[i - G - 1] + 2n) / 2n;
    } else {
      // At the upper bound, can only decrease weight
      days = dp[i - G - 1] + 1n;
    }
    dp[i - G] = days;
  }

  // The result is the expected days to go from W to G
  const p = dp[W - G];
  const q = 1n; // The number of ways to reach G from W is effectively 1 in this bounded problem.

  // Calculate p * q^-1 mod 998244353
  const qInverse = modInverse(q, MOD);
  return (p * qInverse) % MOD;
}

// Example usage
const W = 185;
const G = 183;
const L = 2;

const result = expectedDaysToGoal(W, G, L);
console.log(result.toString()); // Outputs the result in string form to handle large numbers

