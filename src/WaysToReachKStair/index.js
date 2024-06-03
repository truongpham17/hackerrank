// https://leetcode.com/problems/find-number-of-ways-to-reach-the-k-th-stair/description/
// hard
/**
 * @param {number} k
 * @return {number}
 */
var waysToReachStair = function (k) {
  let ways = 0;
  const findMul = (x) => {
    if (x === 1) return x;
    return x * findMul(x - 1)
  }
  for (let i = 0; i < 50; i++) {
    const quad = 2 ** (i + 1)
    if (k <= quad && k >= quad - i - 2) {
      const m = quad - k;
      console.log("🚀 ~ waysToReachStair ~ m:", i, m)
      if (m <= (i + 1) / 2) {
        // find C(n - m + 1, m) = 
        ways += findMul(n - m + 1) / (findMul(m) * findMul(n - 2 * m + 1))
      }
    }
    if (quad - i - 2 > k) {
      break
    }
  }
  return ways

};
console.log(waysToReachStair(1))
//3-D array, store current index, jump, prev = 1,2
// if prev = 2 -> arr[index - 1] = arr[index - 1] + func(index-1, jump, 1)
// start at 1
// could -1
// + 2^0 + 2^1 + ... + 2^n = 2^(n+1)-1
// the minus should <= n+1
// 2^0 + 2^1 + 2^2 = 7 = 2^3 -1
// 1 + 2^(n+1) - 1 - m = k <= 2^(n+1)
// m <= n + 2, m >= 0
// 2^(n+1) - n - 2 <= k <= 2^(n+1)
// find all possible n and m
// then the problem turns to how many way arrange m element in n positions such that
// not any element in m are close to each other
// pick first : have n ways
// then n - 2 ways
// pick next: n - 4 ways
//_ _ _ _ _ _
//1 _ 2 _ 3 _
//1 _ 2 _ _ 3
//1 _ _ 2 _ 3
//_ 1 _ 2 _ 3
// C (n -m + 1, m) 
// C(a,b) = a !/b!(a-b)!