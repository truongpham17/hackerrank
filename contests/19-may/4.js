function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function binomialCoefficient(n, k) {
  if (k > n) {
    return 0;
  }
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function countValidStrings(n, m) {
  if (m > n + 1) {
    return 0; // More "-" than possible slots
  }
  return binomialCoefficient(n + 1, m);
}

function isValid(n, k) {
  const power = Math.pow(2, n);
  return power - n <= k && k <= power + 1;
}

function findNForK(k) {
  let low = 0;
  let high = 30;  // Arbitrary large value, assuming it's enough to cover practical inputs of k
  let result = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (isValid(mid, k)) {
      result = mid;
      high = mid - 1; // Try to find a smaller valid n
    } else {
      low = mid + 1;  // Increase n to make 2^n - n larger
    }
  }
  return result;
}


/**
 * @param {number} k
 * @return {number}
 */
var waysToReachStair = function (k) {
  const step = findNForK(k);
  console.log("🚀 ~ waysToReachStair ~ step:", step)
  const arr = [step];
  if (isValid(step - 1, k)) {
    arr.push(step - 1)
  }
  const result = 0;
  for (const n of arr) {
    for (let m = 0; m <= n + 1; m++) {
      if (2 ** n - m + 1 === k) {
        result += countValidStrings(n, m)
      }
    }
  }
  return result;
};
console.log(waysToReachStair(10))