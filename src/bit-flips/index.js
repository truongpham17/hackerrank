/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minKBitFlips = function (nums, k) {
  let flip = 0
  const flipTrack = []
  let result = 0

  for (let i = 0; i < nums.length; i++) {
    flipTrack.push(false)
    if (i >= k) {
      if (flipTrack[i - k]) {
        flip ^= 1
      }
    }
    const newValue = nums[i] ^ flip;
    if (newValue === 0) {
      if (i + k > nums.length) {
        return -1
      }
      flipTrack[i] = true;
      result++
      flip ^= 1
    }
  }
  return result
};
console.log(minKBitFlips([1, 1, 0], 2))
 