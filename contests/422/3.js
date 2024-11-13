const MOD = 1000000007

function modMult(a, b, mod) {
  let result = 0;
  a = a % mod;

  while (b > 0) {
    if (b % 2 === 1) {
      result = (result + a) % mod;
    }
    a = (a * 2) % mod;
    b = Math.floor(b / 2);
  }

  return result;
}


// Main function to calculate unique arrangements: n! / (f1! * f2! * ... * fk!) % MOD
function uniqueArrangements(frequencyMap, n) {
  let rs = 1;
  const heap = []
  for (const value of frequencyMap) {
    for (let i = 2; i <= value; i++) {
      heap.push(i)
    }
  }
  heap.sort((a, b) => b - a)
  for (let i = 2; i <= n; i++) {
    rs = modMult(rs, i, MOD)
    while (heap.length > 0 && rs % heap[heap.length - 1] === 0) {
      rs /= heap.pop()
    }
  }
  return rs % MOD
}

const getFrequent = (str) => {
  const map = {}
  for (const c of str) {
    if (!map[c]) {
      map[c] = 1
    } else {
      map[c]++
    }
  }
  const arr = []
  for (const x of Object.keys(map)) {
    arr.push([Number(x), map[x]])
  }
  return arr
}

/**
 * @param {string} num
 * @return {number}
 */
var countBalancedPermutations = function (num) {
  const arr = num.split('').sort().map(Number)
  const sum = arr.reduce((total, cur) => total + cur, 0)
  if (sum % 2 === 1) return 0

  const l = Math.floor(arr.length / 2)
  let result = 0;
  const need = sum / 2
  const freqMap = getFrequent(num)
  const newWay = (prevSum, prevIndex, curArr, curLength) => {
    if (prevSum === need && curLength === l) {
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] - curArr[i] > 0) {
          newArr.push(arr[i] - curArr[i])
        }
      }
      result = (result + modMult(uniqueArrangements(curArr.filter(i => i > 0), l), uniqueArrangements(newArr, arr.length - l), MOD)) % MOD
      return
    }
    if (prevSum > need || curLength > l) return

    if (prevIndex + 1 < freqMap.length) {
      for (let i = 0; i <= freqMap[prevIndex + 1][1]; i++) {
        curArr.push(i)
        newWay(prevSum + i * freqMap[prevIndex + 1][0], prevIndex + 1, curArr, curLength + i)
        curArr.pop()
      }
    }
  }
  newWay(0, -1, [], 0)
  return result % MOD
};


console.log(countBalancedPermutations('112'))