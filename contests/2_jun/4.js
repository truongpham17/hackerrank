/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  function getBinaryValueAtPosition(value, pos) {
    return (value >> pos) & 1;
  }

  let exceptCases = []

  const splitTheArray = (start, end, position) => {
    const binaryKValue = getBinaryValueAtPosition(k, position);
    if (binaryKValue === 0) {
      return [[start, end]]
    }

    let tempStart = start;
    const result = []
    let exceptValue = null;
    for (let i = start; i <= end; i++) {
      exceptValue = null
      if (getBinaryValueAtPosition(nums[i], position) === 0) {
        if (i - 1 >= tempStart) {
          result.push([tempStart, i - 1])
        }
        if (exceptValue === null) {
          exceptValue = nums[i]
        } else {
          exceptValue = exceptValue & nums[i];
        }
        tempStart = i + 1
      } else {
        if (exceptValue !== null) {
          exceptCases.push(exceptValue)
        }
        exceptValue = null;
      }
    }
    if (exceptValue !== null) {
      exceptCases.push(exceptValue)
    }
    if (getBinaryValueAtPosition(nums[end], position) === 1) {
      result.push([tempStart, end])
    }
    if (result.length === 0) {
      exceptCases.push(Math.max(...nums.slice(start, end + 1)))
    }
    return result
  }

  const binaryK = convertToBinary(k);
  const lengthK = binaryK.length;

  let nextArr = [];
  let curArr = [[0, nums.length - 1]];
  for (let i = 0; i < lengthK; i++) {
    for (const arr of curArr) {
      nextArr.push(...splitTheArray(arr[0], arr[1], binaryK[i]))
    }
    curArr = nextArr.filter(i => i.length > 0)
    nextArr = []
    console.log("🚀 ~ minimumDifference ~ curArr:", curArr)
  }

  let maxDiff = 10 ** 10;
  exceptCases.forEach(i => {
    if (Math.abs(k - i) > maxDiff) {
      maxDiff = Math.abs(k - 1)
    }
  })

  for (const arr of curArr) {
    const [start, end] = arr;
    let value = 0;
    for (let i = start; i <= end; i++) {
      value = value & nums[i]
    }
    if (Math.abs(k - value) < maxDiff) {
      maxDiff = Math.abs(k - value)
    }
  }
  return maxDiff
};

function convertToBinary(num) {
  if (num === 0) {
    return '0';
  }

  let binary = '';
  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }

  return binary;
}


console.log(minimumDifference([1, 2, 4, 5], 3))