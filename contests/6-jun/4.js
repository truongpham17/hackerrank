/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const available = nums.filter(i => (i & k) >= k)
  console.log("🚀 ~ countSubarrays ~ available:", available)
  const bits = available.map(i => i.toString(2))
  const bitMap = Array.from({ length: 30 }, () => [])
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i]
    for (let j = bit.length - 1; j >= 0; j--) {
      if (bit[j] === '0') {
        bitMap[bit.length - 1 - j].push(i)
      }
    }
  }
  console.log("🚀 ~ countSubarrays ~ bitMap:", bitMap)

  function findAllSetBitPositions(num) {
    const positions = [];
    let position = 0;

    while (num > 0) {
      if ((num & 1) === 1) {
        positions.push(position);
      }
      num = num >> 1;
      position++;
    }

    return positions;
  }
  let total = 0
  for (const num of available) {
    const remaining = num ^ k;
    const redundant = findAllSetBitPositions(remaining)

    let result = 1;
    const set = new Set();

    for (const re of redundant) {
      result *= bitMap[re]
      set.add(...bitMap[re])
    }

    const left = available.length - set.size;
    console.log("🚀 ~ countSubarrays ~ left:", left)
    
    for (let i = 2; i <= left; i++) {
      result *= i
    }
    total += result
  }
  return total / available.length

};
console.log(countSubarrays([1, 1, 2], 1))