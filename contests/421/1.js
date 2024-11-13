function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxScore = function (nums) {
  if (nums.length === 1) return nums[0] ** 2
  let maxProduct = 0
  // not remove any 
  let tempL = nums[0]
  let tempG = nums[0]
  for (let i = 0; i < nums.length; i++) {
    tempL = lcm(tempL, nums[i])
    tempG = gcd(tempG, nums[i])
  }
  maxProduct = tempL * tempG

  for (let i = 0; i < nums.length; i++) {
    // try to remove one
    let tempL = i === 0 ? nums[1] : nums[0]
    let tempG = tempL
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        tempL = lcm(tempL, nums[j])
        tempG = gcd(tempG, nums[j])
      }
    }
    if (tempL * tempG > maxProduct) {
      maxProduct = tempL * tempG
    }
  }
  return maxProduct
};
console.log(maxScore([6, 14, 20]))