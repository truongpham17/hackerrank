// https://leetcode.com/problems/different-ways-to-add-parentheses/?envType=daily-question&envId=2024-09-19
// MEDIUM
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
  const OPERATOR = ['+', '-', '*']
  const numbers = []
  const operators = []
  let temp = ''
  for (const c of expression) {
    if (OPERATOR.includes(c)) {
      operators.push(c)
      if (temp) {
        numbers.push(Number(temp))
        temp = ''
      }
    } else {
      temp += c
    }
  }
  numbers.push(Number(temp))

  const calculate = (nums, ops) => {
    let curValue = nums[0]
    let rs = 0
    let prevCondition = ''
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === '*') {
        curValue *= nums[i + 1]
      } else {
        if (prevCondition === '-') {
          rs -= curValue
        } else {
          rs += curValue
        }
        prevCondition = ops[i]
        curValue = nums[i + 1]
      }
    }
    if (prevCondition === '-') {
      rs -= curValue
    } else {
      rs += curValue
    }
    return rs
  }
  console.log(calculate([ 3, 4, 5 ] ,[ '-', '*' ]))

  const result = []

  const backtrack = (index, mainNums, mainOps, nums, ops) => {
    if (index === numbers.length - 1) {
      console.log("🚀 ~ backtrack ~ mainNums, mainOps, nums, ops:", mainNums, mainOps, nums, ops)
      if (nums.length > 0) {
        const curGroupVal = calculate(nums, ops)
        mainNums.push(curGroupVal)
        result.push(calculate(mainNums, mainOps))
        mainNums.pop()
      } else {
        result.push(calculate(mainNums, mainOps))
      }
      return
    }

    // add to current group
    ops.push(operators[index])
    nums.push(numbers[index + 1])

    backtrack(index + 1, mainNums, mainOps, nums, ops)
    nums.pop()
    ops.pop()

    // add to new group
    // calculate current nums and ops
    const curGroupVal = calculate(nums, ops)
    mainNums.push(curGroupVal)
    mainOps.push(operators[index])
    backtrack(index + 1, mainNums, mainOps, [numbers[index + 1]], [])
    mainNums.pop()
    mainOps.pop()
  }
  backtrack(0, [], [], [numbers[0]], [])
  return result
};
console.log(diffWaysToCompute("2*3-4*5"))
// console.log(diffWaysToCompute("2-1-1"))
// console.log(diffWaysToCompute("1+2+3"))