/**
 * @param {number[]} nums
 * @return {number}
 */
var countPairs = function (nums) {
  const formatStr = (numA, numB) => {
    let strA = numA.toString();
    let strB = numB.toString();
    const lA = strA.length;
    const lB = strB.length;
    if (lA < lB) {
      for (let i = 0; i < lB - lA; i++) {
        strA = '0' + strA
      }
    } else {
      for (let i = 0; i < lA - lB; i++) {
        strB = '0' + strB
      }
    }
    return [strA, strB]
  }
  // a: string, b: string
  const isMatch = ([a, b]) => {
    let diffs = []
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        diffs.push([a[i], b[i]])
        if (diffs.length > 2) {
          return false
        }
      }
    }
    if (diffs.length === 0) {
      return true
    }
    if (diffs.length === 2) {
      if (diffs[0][1] === diffs[1][0] && diffs[0][0] === diffs[1][1]) {
        return true
      }
    }
    return false
  }
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (isMatch(formatStr(nums[i], nums[j]))) {
        result++
      }
    }
  }
  return result
};
console.log(countPairs([1023, 2310, 2130, 213]))