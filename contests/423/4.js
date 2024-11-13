function countSetBits(x) {
  let count = 0;
  while (x > 0) {
    count += x & 1;
    x >>= 1;
  }
  return count;
}

function stepsToReduceToOne(n) {
  let steps = 0;
  while (n !== 1) {
    n = countSetBits(n);
    steps++;
  }
  return steps;
}
const PRECOMPUTE = new Array(801)
for (let i = 1; i < 801; i++) {
  PRECOMPUTE[i] = stepsToReduceToOne(i)
}

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKReducibleNumbers = function (s, k) {
  const MOD = 1e9 + 7;
  // Helper function to calculate combinations using Pascal's Triangle and memoization
  const combinations = (() => {
    const memo = {};
    return (n, k) => {
      if (k > n || k < 0) return 0;
      if (k === 0 || k === n) return 1;
      const key = `${n},${k}`;
      if (key in memo) return memo[key];
      return memo[key] = (combinations(n - 1, k - 1) + combinations(n - 1, k)) % MOD;
    };
  })();

  // Recursive function to count valid binary strings with exactly `n` ones
  function countValidStringsRecursive(a, b, n, length, index, isStrictlyGreaterThanA, isStrictlyLessThanB) {
    // Base case: if we've filled all bits
    if (index === length) return n === 0 ? 1 : 0;

    const currentA = isStrictlyGreaterThanA ? '0' : a[index];
    const currentB = isStrictlyLessThanB ? '1' : b[index];

    let count = 0;

    // Try placing '0' in this position if possible
    if (currentA === '0' && currentB === '1') {
      // Placing '0' gives all possible counts for remaining positions with n ones
      count = (count + combinations(length - index - 1, n)) % MOD;
    } else if (currentA <= '0' && '0' <= currentB) {
      count = (count + countValidStringsRecursive(
        a, b, n, length, index + 1,
        isStrictlyGreaterThanA || currentA < '0',
        isStrictlyLessThanB || currentB > '0'
      )) % MOD;
    }

    // Try placing '1' in this position if we still need ones
    if (n > 0) {
      if (currentA === '0' && currentB === '1') {
        count = (count + combinations(length - index - 1, n - 1)) % MOD;
      } else if (currentA <= '1' && '1' <= currentB) {
        count = (count + countValidStringsRecursive(
          a, b, n - 1, length, index + 1,
          isStrictlyGreaterThanA || currentA < '1',
          isStrictlyLessThanB || currentB > '1'
        )) % MOD;
      }
    }

    return count;
  }

  // Main function to calculate the count of binary strings between a and b with exactly n 1's
  function countValidStrings(a, b, n) {
    const length = a.length;
    return countValidStringsRecursive(a, b, n, length, 0, false, false);
  }

  if (s.length <= 10) {
    const number = parseInt(s, 2)
    if (number <= 800) {
      let rs = 0;
      for (let i = 1; i < number; i++) {
        if (PRECOMPUTE[i] <= k) {
          rs++
        }
      }
      return rs
    }
  }
  let rs = 0;

  // larger than 800
  for (let i = 1; i <= 800; i++) {
    if (PRECOMPUTE[i] <= k) {
      rs = (rs + 1) % MOD
      if (PRECOMPUTE[i] < k) {
        rs = (rs + countValidStrings('1100100000', s, i)) % MOD
      }
    }
  }
  return rs
};


console.log(countKReducibleNumbers('1100101111', 5))