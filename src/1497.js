/**
 * @param {number[]} arr
 * @param {number} k
 * @return {boolean}
 */
var canArrange = function (arr, k) {
  const mid = Math.floor(k / 2)
  const modArr = Array(mid + 1).fill(0)
  let count = 0;
  for (const num of arr) {
    const mod = ((num % k) + k) % k
    if (mod <= mid) {
      if (modArr[mod] < 0) {
        count--
      } else {
        count++
      }
      modArr[mod]++

    } else {
      if (modArr[k - mod] > 0) {
        count--
      } else {
        count++
      }
      modArr[k - mod]--
    }
  }


  if (modArr[0] % 2 !== 0) return false;
  if (k % 2 === 0 && modArr[mid] % 2 !== 0) return false

  count -= modArr[0]
  if (k % 2 === 0) {
    count -= modArr[mid]
  }
  return count === 0
};

console.log(canArrange([-1, 1, -2, 2, -3, 3, -4, 4], 3))