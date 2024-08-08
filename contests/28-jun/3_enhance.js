/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  class Fenwick {
    tree
    n
    constructor(n) {
      this.tree = Array(n + 1).fill(0)
      this.n = n
    }
    query(x) {
      let j = x + 1;/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const arr = Array.from({ length: s.length }, () => [0, 0])
  let oneCount = 0
  let zeroCount = 0

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '1') {
      oneCount++
    }
    else {
      zeroCount++
    }
    arr[i][0] = zeroCount
    arr[i][1] = oneCount
  }
  arr.sort((a, b) => a[1] - a[0] ** 2 - (b[1] - b[0] ** 2))
  const binarySearch = (minusZero, minusOne) => {
    let l = 0;
    let r = s.length - 1;
    let result = -1
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      const cal = ([zero, one]) => {
        return ((Math.max(one - minusOne, 0)) - (Math.max(zero - minusZero, 0)) ** 2)
      }
      if (cal(arr[mid]) >= 0) {
        result = mid;
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    if (result !== -1) {
      return s.length - 1 - result + 1
    }
    return 0
  }

  let result = 0;
  let minus = 0;
  oneCount = 0
  zeroCount = 0
  for (let i = s.length - 1; i >= 0; i--) {
    const found = binarySearch(zeroCount, oneCount)
    result += Math.max(found - minus, 0);
    minus++
    if (s[i] === '1') {
      oneCount++
    } else {
      zeroCount++
    }
  }
  return result
};
      let sum = 0;
      while (j > 0) {
        sum += this.tree[j]
        j -= j & (-j)
      }
      return sum
    }
    update(index, delta) {
      let j = index + 1;
      while (j <= n) {
        this.tree[j] += delta;
        j += j & (-j)
      }
    }
  }
  const tree = new Fenwick(s.length)
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      tree.update(i, 1)
    }
    const totalOne = tree.query(i)
    const totalZero = i - totalOne

  }
};
console.log(numberOfSubstrings("0111"))