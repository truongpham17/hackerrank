// https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k/description/
// HARD
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number} //console.log(countSubarrays([1, 0, 10, 10, 4], 4))
 */
var countSubarrays = function (nums, k) {
  const logn = Math.ceil(Math.log2(nums.length))
  const n = nums.length
  const sparseTable = Array.from({ length: n }, () => Array(logn).fill(0))
  for (let i = 0; i < n; i++) {
    sparseTable[i][0] = nums[i]
  }
  let j = 1;
  while ((1 << j) <= n) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      sparseTable[i][j] = sparseTable[i][j - 1] & sparseTable[i + (1 << (j - 1))][j - 1]
    }
    j++
  }

  const andLR = (L, R) => {
    const k = Math.floor(Math.log2(R + 1 - L))
    const x = R - (1 << k) + 1
    return sparseTable[L][k] & sparseTable[x][k]
  }

  // andLR(l, result) === k && andLR(l, result + 1) < k
  const findLargestIndex = (l, r) => {
    let R = r;
    let L = l
    while (L <= R && R <= r) {
      const mid = Math.floor((L + R) / 2)
      const value = andLR(l, mid)
      if (value > k) {
        L = mid + 1
      } else if (value === k) {
        if (mid < n - 1) {
          const nextValue = andLR(l, mid + 1)
          if (nextValue < k) {
            return mid
          } else {
            L = mid + 1
          }
        } else {
          return mid
        }
      } else {
        R = mid - 1
      }
    }
    return -1
  }
  //andLR(l, result) === k && andLR(l, result - 1) > k
  const findSmallerIndex = (l, r) => {
    let R = r;
    let L = l;
    while (L <= R && R <= r) {
      const mid = Math.floor((L + R) / 2)
      const value = andLR(l, mid)
      if (value === k) {
        if (mid === 0) {
          return mid
        }
        if (andLR(l, mid - 1) > k) {
          return mid
        }
        R = mid - 1
      } else {
        L = mid + 1
      }
    }
    return -1
  }

  let result = 0;
  let saveLeft = 0
  for (let i = 0; i < n; i++) {
    const nextIndex = findLargestIndex(Math.max(i, saveLeft - 1), n - 1)
    if (nextIndex !== -1) {
      saveLeft = nextIndex
      const lessIndex = findSmallerIndex(i, nextIndex);
      result += nextIndex - Math.max(lessIndex, i) + 1
    }
  }
  return result
};
console.log(countSubarrays([1, 1, 2], 1))
// [L, R]
// L + 2^K = R + 1
// K =floor log2 R + 1 - L
//

// k = floor(log2(m + 1 - i))