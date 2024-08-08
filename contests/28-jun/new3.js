/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const arr = Array.from({ length: s.length }, () => [0, 0, 0])
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
    arr[i][2] = i
  }
  arr.sort((a, b) => a[1] - a[0] ** 2 - (b[1] - b[0] ** 2))
  const map = new Map()
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i][2], i)
  }
  const binarySearch = (minusZero, minusOne) => {
    let l = 0;
    let r = arr.length - 1;
    let result = -1
    while (l <= r) {
      const mid = Math.floor((l + r) / 2)
      const cal = ([zero, one]) => {
        return (((one - minusOne, 0)) - ((zero - minusZero, 0)) ** 2)
      }
      if (cal(arr[mid]) >= 0) {
        result = mid;
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    if (result !== -1) {
      const res = arr.length - 1 - result + 1
      return res
    }
    return 0
  }

  let result = 0;
  let minus = 0;
  oneCount = 0
  zeroCount = 0
  for (let i = s.length - 1; i >= 0; i--) {
    const found = binarySearch(zeroCount, oneCount)
    arr.splice(map.get(i), 1)
    result += found
    if (s[i] === '1') {
      oneCount++
    } else {
      zeroCount++
    }
  }
  return result
};
console.log(numberOfSubstrings("0111"))