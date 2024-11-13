/**
 * @param {string} expression
 * @return {boolean}
 */
var parseBoolExpr = function (expression) {
  const expStack = []
  const valStack = []
  const exp = ['|', '&', '!']
  const push = (x) => {
    if (valStack.length === 0) {
      valStack.push([])
    }
    valStack[valStack.length - 1].push(x)
  }
  for (const c of expression) {
    if (exp.includes(c)) {
      expStack.push(c)
    } else if (c === ')') {
      const topExp = expStack.pop();
      let value;
      const vals = valStack.pop();
      switch (topExp) {
        case '|':
          value = !!vals.reduce((acc, cur) => acc | cur, vals[0])
          break
        case '&':
          value = !!vals.reduce((acc, cur) => acc & cur, vals[0])
          break
        case '!':
          value = !vals[0]
          break
      }
      push(value)
    } else if (c === 't') {
      push(true)
    } else if (c === 'f') {
      push(false)
    } else if (c === '(') {
      valStack.push([])
    }
  }
  return valStack[0][0]
};
console.log(parseBoolExpr('|(&(t,f,t),!(t))'))