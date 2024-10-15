/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
var minSubarray = function (nums, p) {
  const prefix = new Map()

  prefix.set(0, [nums.length])
  let cur = 0;
  let min = 10 ** 10;
  for (let i = nums.length - 1; i >= 0; i--) {
    cur = (cur + nums[i]) % p
    if (cur === 0) {
      min = i
    }
    if (!prefix.has(cur)) {
      prefix.set(cur, [])
    }
    prefix.get(cur).push(i)
  }

  cur = 0
  
  for (let i = 0; i < nums.length; i++) {
    cur = (cur + nums[i]) % p
    if (cur === 0) {
      min = Math.min(min, nums.length - i)
    }
    const fill = prefix.get((p - cur) % p)

    if (fill?.length > 0) {
      while (fill.length > 0 && fill[fill.length - 1] <= i) {
        fill.pop()
      }
      if (fill.length > 0) {
        min = Math.min(min, fill[fill.length - 1] - i - 1)
      }
    }
  }
  return min === 10 ** 10 ? -1 : min
};
console.log(minSubarray([8, 32, 31, 18, 34, 20, 21, 13, 1, 27, 23, 22, 11, 15, 30, 4, 2], 148))