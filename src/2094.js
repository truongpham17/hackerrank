/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
  const set = new Map();
  for (let i = 0; i < digits.length; i++) {
    const x = digits[i]
    if (x % 2 === 0) {
      set.set(x, i)
    }
  }

  const rs = new Set();

  for (const k of set.keys()) {
    for (let i = 0; i < digits.length; i++) {
      for (let j = 0; j < digits.length; j++) {
        if (i !== j && j !== set.get(k) && i !== set.get(k)) {
          const v = digits[i] * 100 + digits[j] * 10 + k
          if (v >= 100 && !rs.has(v)) {
            rs.add(v)
          }
        }
      }
    }
  }
  const arrRs = []
  for (const v of rs.keys()) {
    arrRs.push(v)
  }
  return arrRs.sort((a, b) => a - b)
};
console.log(findEvenNumbers([2, 1, 3, 0]))