/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let count = 0;
  let tempValue = nums[nums.length - 1]
  for (let i = nums.length - 2; i >= 0; i--) {
    while (nums[i] > tempValue && nums[i] >= maxDivisor[nums[i]] && maxDivisor[nums[i]] > 1) {
      nums[i] /= maxDivisor[nums[i]]
      count++
    }
    if (nums[i] > tempValue) {
      return -1
    }
    tempValue = nums[i]
  }
  return count
};

const maxDivisor = precomputeGreatestDivisors(1000000)

function precomputeGreatestDivisors(limit) {
  const greatestDivisors = new Array(limit + 1).fill(1); // Start with 1 as the divisor for all numbers

  // Iterate over possible divisors
  for (let i = 2; i <= limit; i++) {
    // Update divisors only for multiples of i
    for (let j = i * 2; j <= limit; j += i) {
      greatestDivisors[j] = i;
    }
  }

  return greatestDivisors;
}

console.log(minOperations([24, 17, 29]))