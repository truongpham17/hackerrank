

/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var possibleStringCount = function (word, k) {
  const MOD = 10 ** 9 + 7
  function countLessK(A, k) {
    const n = A.length;
    const dp = Array(k).fill(0);
    dp[0] = 1;

    for (let i = 0; i < n; i++) {
      const currentMax = A[i];
      const newDp = dp.slice();


      const pfSum = Array(k + 1).fill(0);
      for (let sum = 0; sum < k; sum++) {
        pfSum[sum + 1] = (pfSum[sum] + dp[sum]) % MOD;
      }


      for (let sum = 0; sum < k; sum++) {
        const start = Math.max(0, sum - currentMax);
        newDp[sum] = (pfSum[sum + 1] - pfSum[start] + MOD) % MOD;
      }


      for (let j = 0; j < k; j++) {
        dp[j] = newDp[j] % MOD;
      }
    }


    let totalWays = 0;
    for (let sum = 0; sum < k; sum++) {
      totalWays = (totalWays + dp[sum]) % MOD;
    }

    return totalWays;
  }



  const arr = []
  let curCount = 0;
  let curChar = ''
  let nonDuplicate = 0;
  for (const c of word) {
    if (c === curChar) {
      curCount++
    } else {
      if (curCount > 0) {
        arr.push(curCount)
      }
      curCount = 0
      nonDuplicate++
    }
    curChar = c
  }
  if (curCount > 0) {
    arr.push(curCount)
  }

  const exclude = k - nonDuplicate >= 0 ? countLessK(arr, k - nonDuplicate) : 0
  let total = 1;
  for (const value of arr) {
    total *= (value + 1);
    total %= MOD
  }
  return (total - exclude + MOD) % MOD
};
