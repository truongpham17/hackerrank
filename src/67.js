/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  const rs = []
  let temp = 0
  let i = a.length - 1;
  let j = b.length - 1;
  const push = (temp) => {
    if (temp === 2) {
      rs.push('0')
      return 1
    } else if (temp === 1) {
      rs.push('1')
      return 0
    } else if(temp === 0) {
      rs.push('0')
      return 0
    } else if (temp === 3) {
      rs.push('1')
      return 1
    }
  }
  while (i >= 0 && j >= 0) {
    temp += Number(a[i]) + Number(b[j])
    temp = push(temp)
    i--
    j--
  }
  
  if (a.length > b.length) {
    for (let k = i; k >= 0; k--) {
      temp += Number(a[k])
      temp = push(temp)
    }
  } else if (b.length > a.length) {
    for (let k = j; k >= 0; k--) {
      temp += Number(b[k])
      temp = push(temp)
    }
  }
  while (temp > 0) {
    temp = push(temp)
  }
  
  let str = ''
  for(let i =rs.length -1; i >=0; i--) {
    str += rs[i]
  }
  return str
};
console.log(addBinary("1111", "1111"))