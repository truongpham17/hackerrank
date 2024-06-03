const QUESTION_MARK = "?"
const EQUAL = "="

const OPERATORS = ["+", "-", "*", "/"]

const math = (str) => {
  const params = [""]

  let operator = '';
  for (let char of str) {
    if (char === " ") {
      continue;
    }

    if (isNaN(char)) {
      if (char === QUESTION_MARK) {
        params[params.length - 1] = params[params.length - 1] + QUESTION_MARK;
      } else if (OPERATORS.includes(char)) {
        operator = char;
        params.push("")
      } else if (char === EQUAL) {
        params.push("")
      }
    } else {
      params[params.length - 1] = params[params.length - 1] + char;
    }
  }

  const calculate = (x, y, operator) => {
    switch (operator) {
      case "+": return x + y;
      case "-": return x - y;
      case "*": return x * y;
      case "/": return x / y
    }
  }
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      const firstNum = params[0].replace(QUESTION_MARK, i.toString())
      const secondNum = params[1].replace(QUESTION_MARK, i.toString())
      const result = params[2].replace(QUESTION_MARK, j.toString());
      if (calculate(Number(firstNum), Number(secondNum), operator) === Number(result)) {
        return `${i} ${j}`
      }
    }
  }
  return ""
}
