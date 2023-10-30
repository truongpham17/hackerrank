// difficulty level: HARD
// source: https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  const array = [];
  // a for true, b for false

  array[0] = {
    a: 1,
    b: null,
  };
  for (let i = 1; i <= n; i++) {
    // atleast from i to i - ranges[i], there is one tap open with value
    let minForYes = 0;
    let minForNo = 0;
    // calculate for yes
    for (let j = i - 1; j >= 0; j--) {
      // if(array[j] > 0 &&  )
    }
    // array[i] = {
    //   a:
    // };
  }
};

/**
 * Solution
 * DP programming
 * ranges: [0..n]
 * v[i]: min taps need to open to cover from 0 to i
 * v[i + 1] = select i+1? -> range will be increase
 *            not select i+1? -> range will be not increase
 * v[i,j] = tap from 0 to i with j reach
 * v[i + 1, j] = v[i, j] if j >= i + 1
 *             = min(v[i - 1, j - k] + 1)// false
 * what need to check: how many taps need to open
 * what is the current longest?
 *
 * v[i, j] = highest cover if open j tap ranges from 0 to i
 * v[0, 0] = 0
 * v[0, 1] = ranges[0]
 * v[i, j + 1] =
 * v[i, true/false]
 * v[i, true] = v[i - k, true] + 1
 * v[i + 1, false] = Math.min(v[i - k, true]) if (value[k] + i) >= i + 1
 */
