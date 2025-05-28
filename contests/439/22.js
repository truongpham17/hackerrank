var longestPalindromicSubsequence = function (s, k) {
  const memo = new Map();
  const stepIds = [];
  for (let a = 0; a < s.length; a++) {
    for (let b = 0; b < s.length; b++) {
      const pos = a * 200 + b
      stepIds[pos] = Math.min((s.charCodeAt(a) - s.charCodeAt(b) + 26) % 26, (s.charCodeAt(b) - s.charCodeAt(a) + 26) % 26)
    }
  }
  const getStep = (a, b) => {
    const pos = a * 200 + b;
    return stepIds[pos]
  }

  const toId = (l, r, k) => l * 62500 + r * 250 + k

  function dp(i, j, r) {
    if (r < 0) return 0;
    if (i > j) return 0;
    if (i === j) return 1;
    const key = toId(i, j, r)
    if (memo.has(key)) return memo.get(key);
    let best = 0;
    const step = getStep(i, j)
    if (r >= step) {
      best = 2
    }
    best += dp(i + 1, j - 1, r - step);
    best = Math.max(best, dp(i + 1, j, r), dp(i, j - 1, r));
    memo.set(key, best);
    return best;
  }
  return dp(0, s.length - 1, k);
};

console.log(longestPalindromicSubsequence("cqnzdmldgxvrxdprkzvlerpseadghnbqwynfeyocaquoz", 10)); // expected output: 3
