function calculateFinalDigits(s) {
  // If the string is already of length 2 or less, return it.
  if (s.length <= 2) return s;

  const n = s.length;
  // We perform n-2 rounds, so the binomial coefficients come from (1+x)^(n-2)
  const k = n - 2;
  // Convert string digits to an array of numbers
  const digits = s.split('').map(Number);

  let coeff = 1; // This is binom(k, 0)
  let first = 0;
  let second = 0;

  // Loop i from 0 to k (there will be k+1 coefficients)
  for (let i = 0; i <= k; i++) {
    // For the first final digit, we use digits[i] multiplied by binom(k, i)
    if (i < digits.length) {
      first = (first + coeff * digits[i]) % 10;
    }
    // For the second final digit, we use digits[i+1]
    if (i + 1 < digits.length) {
      second = (second + coeff * digits[i + 1]) % 10;
    }
    // Update coeff to be binom(k, i+1) using the recurrence:
    // binom(k, i+1) = binom(k, i) * (k - i) / (i + 1)
    if (i < k) {
      coeff = (coeff * (k - i)) / (i + 1);
    }
  }
  // Return the final two digits as a string
  return `${first}${second}`;
}

// Example usage:
console.log(calculateFinalDigits("12345")); // Output: "08"
