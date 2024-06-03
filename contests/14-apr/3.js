function gcd(a, b) {
  while (b !== 0) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return a * (b / gcd(a, b));
}

function findLCM(array) {
  return array.reduce((acc, num) => lcm(acc, num), 1);

// array of array
function countSubElement(array, LCM) {
  let sum = 0;
  for (const ar of array) {
    const lcm = findLCM(ar)
    sum += LCM % lcm
  }
  return sum
}

// step = 2 -> [1, 2], [1,3], [1,4], [1,5], ...
// step = 3 => [1,,2,3], [1,3,4], ...
function generateArray(pivot, array, step) {
  
}

function countElement(array, LCM) {
  let sum = 0;
  // i is the array length
  for (const pivotNumber of array) {
    for (let i = 1; i <= array.length; i++) {
      if (i % 2 === 0) {
        sum += doSomethingHere()
      } else {
        sum -= doSomethingHere()
      }
    }
  }

  return sum;

}


/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function (coins, k) {
  const LCM = findLCM(coins)
};