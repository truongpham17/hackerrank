function countElementsGreaterOrEqualToK(arr, k) {
  // Ensure the array is sorted in increasing order
  if (!Array.isArray(arr) || arr.some(isNaN)) {
    throw new Error("Input must be an array of numbers.");
  }

  // Use binary search for efficiency
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < k) {
      left = mid + 1; // Move to the right
    } else {
      right = mid - 1; // Move to the left
    }
  }

  // Left now points to the first element >= k
  return arr.length - left;
}

/**
 * @param {string} s
 * @param {number} numOps
 * @return {number}
 */
var minLength = function (s, numOps) {
  const n = s.length;
  const findOpsOne = () => {
    let ops = 0
    let ops2 = 0
    for (let i = 0; i < n; i++) {
      if (Number(s[i]) !== i % 2) {
        ops++
      } else {
        ops2++
      }
    }
    return Math.min(ops, ops2)
  }

  if (findOpsOne() <= numOps) return 1


  // binary search
  let sameCount = 0;
  let curChar = ''
  const acc = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== curChar) {
      if (sameCount > 0) {
        console.log(s[i], curChar)
        acc.push(sameCount)
      }
      curChar = s[i]
      sameCount = 0
    }
    sameCount++

  }

  if (sameCount > 0) {
    acc.push(sameCount)
  }
  const maxSameCount = Math.max(...acc)
  acc.sort((a, b) => a - b)

  let l = 2;
  let r = maxSameCount;
  let rs = -1
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (countElementsGreaterOrEqualToK(acc, mid) % mid < numOps) {
      rs = mid;
      r = mid - 1;
    } else {
      l = mid + 1
    }
  }
  return rs
};

console.log(minLength('000000', 1))