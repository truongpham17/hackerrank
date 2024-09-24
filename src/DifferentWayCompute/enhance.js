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
  const INF = 10 ** 5

  const map = new Map()
  const getKey = (start, end) => start * INF + end

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

  const dfs = (start, end) => {
    if (map.has(getKey(start, end))) {
      return map.get(getKey(start, end))
    }

    if (start > end) return [numbers[start]]

    const rs = []
    for (let i = start; i <= end; i++) {
      const left = dfs(start, i - 1)
      const right = dfs(i + 1, end)
      for (l of left) {
        for (r of right) {
          rs.push(math(l, r, operators[i]))
        }
      }
    }
    map.set(getKey(start, end), rs)
    return rs
  }
  return dfs(0, operators.length - 1)
};

console.log(diffWaysToCompute("1+3*4"))