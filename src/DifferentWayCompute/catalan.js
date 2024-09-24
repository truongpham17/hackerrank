/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
  const OPERATOR = ['+', '-', '*']
  const numbers = []
  let temp = ''

  const opCount = {
    '+': 0,
    '-': 0,
    '*': 0
  }
  for (const c of expression) {
    if (OPERATOR.includes(c)) {
      opCount[c]++
      if (temp) {
        numbers.push(Number(temp))
        temp = ''
      }
    } else {
      temp += c
    }
  }

  numbers.push(Number(temp))
  const tree = Array(expression.length)
  for (let i = 0; i < numbers.length; i++) {
    tree[numbers.length + i - 1] = numbers[i]
  }
  const opLength = numbers.length - 1

  const math = (a, b, operator) => {
    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      default:
        return a * b
    }
  }
  const calculateTree = (tree, index) => {
    if (OPERATOR.includes(tree[index])) {
      return math(calculateTree(tree, index * 2 + 1), calculateTree(tree, index * 2 + 2), tree[index])
    }
    return tree[index]
  }

  const rs = []
  const buildOperation = (tree, curOpLength) => {
    if (curOpLength === opLength) {
      console.log("🚀 ~ buildOperation ~ tree:", tree)
      const value = calculateTree(tree, 0)
      rs.push(value)
      return
    }

    for (const operator of OPERATOR) {
      if (opCount[operator] > 0) {
        opCount[operator]--
        tree[curOpLength] = operator
        buildOperation(tree, curOpLength + 1)
        tree[curOpLength] = null
        opCount[operator]++
      }
    }
  }
  console.log("🚀 ~ diffWaysToCompute ~ tree:", tree)
  buildOperation(tree, 0);
  return rs
};
console.log(diffWaysToCompute("1+2*3"))