/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSplits = function (nums) {
  let str = ''
  const ignoreSet = new Set();
  for (const num of nums) {
    const char = num.toString();
    if (char.length === 2) {
      const curLength = str.length;
      ignoreSet.add(curLength + 1)

    }
    str += char
  }
  const rsSet = new Set()
  for (let i = 1; i < str.length; i++) {
    countPrefixSuffix(str.substring(0, i), str.substring(i, str.length), i, ignoreSet, rsSet)
  }
  return rsSet.size
};

const countPrefixSuffix = (A, B, middlePoint, ignoreSet, rsSet) => {
  const minLength = Math.min(A.length, B.length);
  const set = new Set();
  let curStr = ''
  for (let i = 0; i < minLength; i++) {
    curStr += B[i]
    set.add(curStr)
  }

  curStr = ''

  for (let i = A.length - 1; i >= 0; i--) {
    curStr = A[i] + curStr;
    if (curStr.length > minLength) break
    if (set.has(curStr)) {
      if (!ignoreSet.has(i)) {
        const value = i * 10000 + middlePoint
        if (!rsSet.has(value)) {
          rsSet.add(value)
        }
      }
    }
  }
}

console.log(beautifulSplits([1, 1, 2, 1]))