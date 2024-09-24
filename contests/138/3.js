/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countGoodIntegers = function (n, k) {
  function isPalindromeNumber(num) {
    // Convert the number to a string
    const str = num.toString();

    // Initialize two pointers: one at the start, one at the end of the string
    let left = 0;
    let right = str.length - 1;

    // Loop until the pointers meet in the middle
    while (left < right) {
      // Check if the characters at the pointers are the same
      if (str[left] !== str[right]) {
        return false; // Not a palindrome
      }
      // Move the pointers towards the middle
      left++;
      right--;
    }

    return true; // It's a palindrome
  }
  // if (n <= 4) {
  //   let rs = 0
  //   for (let i = 10 ** n; i < 10 ** (n + 1) - 1; i++) {
  //     if (i % k === 0 && isPalindromeNumber(i)) {
  //       rs++
  //     }
  //   }
  //   return rs
  // }

  const mid = Math.floor(n / 2)
  switch (k) {
    case 1:
      if (n % 2 === 0) {
        return 9 * 10 ** (mid - 1)
      } else {
        return 9 * 10 ** mid
      }

    case 2:
      if (n % 2 === 0) {
        return 4 * 10 ** (mid - 1)
      } else {
        return 4 ** 10 * (mid)
      }

    case 3:
      if (n % 2 === 0) {
        return 9 * 10 ** (mid - 2) * (10 / 3)
      }
      return 9 * 10 ** (mid - 1) * (10 / 3)
    case 4:
      if (n % 2 === 0) {
        return 23 * 10 ** (mid - 2)
      } else {
        return 23 * 10 ** (mid - 1)
      }
    case 5:
      if (n % 2 === 0) {
        return 1 * 10 ** (mid - 1)
      }
      return 1 * 10 ** (mid)
    case 6:
      if (n % 2 === 0) {
        // first number, 1 middle number, and rest: n - 3
        return 4 * 10 ** (mid - 2) * (10 / 3)
      }
      return 4 * 10 ** (mid - 1) * (10 / 3)
    case 7:

    case 8:
      if (n % 2 === 0) {
        // first 3 number
        return 112 * 10 ** (mid - 3)
      }
      return 112 * 10 ** (mid - 3) * 10
    case 9:
      if (n % 2 === 0) {
        return 9 * 10 ** (mid - 2) * (10 / 9)
      }
      return 9 * 10 ** (mid - 1) * (10 / 9)
  }
};
console.log(countGoodIntegers(3, 5))