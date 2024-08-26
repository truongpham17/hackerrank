/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var largestPalindrome = function (n, k) {
  if (k === 2) {
    let result = '8'
    if (n === 1) return result;
    for (let i = 0; i < n - 2; i++) {
      result += '9'
    }
    result += '8'
    return result
  }

  if (k === 3 || k === 9 || k === 1) {
    if (n === 1) return '9'
    let result = ''
    for (let i = 0; i < n; i++) {
      result += '9';
    }
    return result
  }

  if (k === 4) {
    if (n === 1) return '8'
    if (n === 2) return '88'
    if (n === 3) return '888'
    if (n === 4) return '8888'
    let result = '88'
    while (result.length + 2 < n) {
      result += '9'
    }
    result += '88'
    return result
  }

  if (k === 5) {

    let result = '5'
    if (n === 1) return result
    for (let i = 0; i < n - 2; i++) {
      result += '9'
    }
    result += '5'
    return result
  }

  if (k === 6) {
    if (n === 1) return '6'
    if (n === 2) return '66'

    if (n % 2 === 1) {
      let result = '8'
      let mid = 8 % 3
      for (let i = 0; i < (n - 2) / 2 - 1; i++) {
        result += '9'
        mid += 9
        mid %= 6
      }
      mid *= 2
      mid %= 6
      result += 9 - mid % 3
      for (let i = 0; i < (n - 2) / 2 - 1; i++) {
        result += '9'
      }
      result += '8'
      return result
    } else {
      let result = '8'
      let mid = 8 % 3
      for (let i = 0; i < (n - 2) / 2 - 1; i++) {
        result += '9'
        mid += 9
        mid %= 3
      }
      mid *= 2
      mid %= 3
      for (let i = 9; i >= 0; i--) {
        if ((i * 10 + i) % 3 === (3 - mid) % 3) {
          result += i
          result += i
          break
        }
      }
      for (let i = 0; i < (n - 2) / 2 - 1; i++) {
        result += '9'
      }
      result += '8'
      return result
    }


  }


  if (k === 7) {
    if (n === 1) return '7'
    if (n === 2) return '77'
    const mod = [1, 3, 2, 6, 4, 5]
    if (n % 2 === 1) {
      let remaining = 0
      for (let i = 0; i < n; i++) {
        if (i === Math.floor(n / 2)) continue
        remaining += (9 * mod[i % 6])
        remaining %= 7
      }
      let missing = ''
      for (let i = 9; i >= 0; i--) {
        if (i * mod[(Math.floor(n / 2)) % 6] % 7 === (7 - remaining) % 7) {
          missing = i
          break
        }
      }

      let result = '9'
      for (let i = 0; i < (n - 1) / 2 - 1; i++) {
        result += '9'
      }
      result += missing
      for (let i = 0; i < (n - 1) / 2 - 1; i++) {
        result += '9'
      }
      result += '9'
      return result
    } else {
      let remaining = 0
      for (let i = 0; i < n; i++) {
        if (i === n / 2 || i === n / 2 - 1) continue
        remaining += (9 * mod[i % 6])
        remaining %= 7
      }
      let missing = ''
      for (let i = 9; i >= 0; i--) {
        if ((i * mod[(n / 2) % 6] + i * mod[(n / 2 - 1) % 6]) % 7 === (7 - remaining) % 7) {
          missing = i
          break;
        }
      }
      let i = 7

      let result = '9'
      for (let i = 0; i < (n - 1) / 2 - 2; i++) {
        result += '9'
      }
      result += missing
      result += missing
      for (let i = 0; i < (n - 1) / 2 - 2; i++) {
        result += '9'
      }
      result += '9'
      return result
    }
  }

  if (k === 8) {
    if(n < 7) {
      let result = ''
      for (let i = 0; i < n; i++) {
        result += '8';
      }
      return result
    } else {
      let result ='888'
      while(result.length + 3 < n) {
        result += '9'
      }
      result += '888'
      return result
    }
  }
};

console.log(largestPalindrome(10, 1))
console.log(largestPalindrome(1, 2))
console.log(largestPalindrome(10, 3))
console.log(largestPalindrome(3, 4))
console.log(largestPalindrome(4, 4))
console.log(largestPalindrome(5, 4))
console.log(largestPalindrome(5, 5))
console.log(largestPalindrome(5, 6))
console.log(largestPalindrome(8, 6))
console.log(largestPalindrome(13, 6))
console.log(largestPalindrome(5, 7))
console.log(largestPalindrome(6, 7))
console.log(largestPalindrome(2, 7))
console.log(largestPalindrome(4, 4))
console.log(largestPalindrome(5, 4))
console.log(largestPalindrome(6, 4))