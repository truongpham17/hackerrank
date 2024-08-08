// HARD

// https://leetcode.com/problems/integer-to-english-words/description/?envType=daily-question&envId=2024-08-07
/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
  if (num === 0) return "Zero"

  const d = {
    0: "Zero",
    1: "One",
    2: "Two",
    3: "Three",
    4: "Four",
    5: "Five",
    6: "Six",
    7: "Seven",
    8: "Eight",
    9: "Nine",
    10: "Ten",
    11: "Eleven",
    12: "Twelve",
    13: "Thirteen",
    14: "Fourteen",
    15: "Fifteen",
    16: "Sixteen",
    17: "Seventeen",
    18: "Eighteen",
    19: "Nineteen",
    20: "Twenty",
    30: "Thirty",
    40: "Forty",
    50: "Fifty",
    60: "Sixty",
    70: "Seventy",
    80: "Eighty",
    90: "Ninety",
    100: "Hundred",
    1000: "Thousand",
    1000000: "Million",
    1000000000: "Billion"
  }

  const toEnglishSmall = (x) => {
    let result = []
    let num = Number(x)
    if (num === 0) return []
    if (num >= 100) {
      result.push(d[Math.floor(x / 100)], d[100])
    }
    num = num % 100
    if (num >= 10) {
      if (num < 20) {
        result.push(d[num])
        return result
      } else {
        result.push(d[num - num % 10])
      }
    }
    num = num % 10
    if (num > 0) {
      result.push(d[num])
    }
    return result
  }
  const stack = []
  const x = num.toString()
  let temp = ''
  for (let i = x.length - 1; i >= 0; i--) {
    temp = x[i] + temp
    if (temp.length === 3) {
      stack.push(temp)
      temp = ''
    }
  }
  if (temp.length > 0) {
    stack.push(temp)
  }
  let result = []
  stack.reverse()
  for (let i = 0; i < stack.length; i++) {
    result.push(...toEnglishSmall(stack[i]))
    if (i < stack.length - 1 && Number(stack[i]) > 0) {
      result.push(d[10 ** (3 * (stack.length - 1 - i))])
    }
  }
  return result.join(' ')
};
console.log(numberToWords(1000))