/**
 * @param {number[]} nums
 * @return {number}
 */

var maximumPrimeDifference = function (nums) {
  // store number i, value true if it is prime
  const map = new Map();
 
  let leftPivot = -1
  let rightPivot = -1
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i])) {
      leftPivot = i
      break
    }
    const isNumPrime = isPrime(nums[i])
    map.set(nums[i], isNumPrime)
    if (isNumPrime) {
      leftPivot = i
      break
    }
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    if (map.get(nums[i])) {
      rightPivot = i
      break
    }
    const isNumPrime = isPrime(nums[i])
    map.set(nums[i], isNumPrime)
    if (isNumPrime) {
      rightPivot = i
      break
    }
  }
  return rightPivot - leftPivot
};

const isPrime = (number) => {
  if (number === 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false
  }
  return true 
}

console.log(maximumPrimeDifference([4,8,2,8]))
console.log(isPrime(2))