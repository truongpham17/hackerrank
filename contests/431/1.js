function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}


function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function mul(arr) {
  let rs = 1;
  for (const v of arr) {
    rs *= v
  }
  return rs
}

function gcdOfArray(arr) {
  return arr.reduce((acc, num) => gcd(acc, num));
}

function lcmOfArray(arr) {
  return arr.reduce((acc, num) => lcm(acc, num));
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxLength = function (nums) {
  let rs = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j <= nums.length; j++) {
      // array from i to j
      const arr = nums.slice(i, j)
      if (mul(arr) === lcmOfArray(arr) * gcdOfArray(arr)) {
        rs = Math.max(rs, j - i)
      }
    }
  }
  return rs
};