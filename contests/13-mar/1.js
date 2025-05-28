function main(pattern, s) {
  let index = 0;
  const check = (p) => {
    let value;
    switch (p) {
      case '+':
        value = s.charCodeAt(index);
        index++;
        return (value >= 97 && value <= 122) || (value >= 65) && (value <= 90)
      case '$':
        value = Number(s[index])
        index++
        return value >= 0 && value <= 9
      default:
        const count = Number(p.slice(2, p.length - 1))
        if (count === 1) {
          index++
          return true;
        }
        for (let i = index + 1; i < index + count; i++) {
          if (s[i] !== s[index]) {
            return false
          }
        }
        index = index + count;
        return true
    }
  }
  const readPattern = () => {
    const rs = []
    let i = 0;

    while (i < pattern.length) {
      if (pattern[i] !== '*') {
        rs.push(pattern[i])
        i++
      } else {
        let temp = ''
        if (pattern[i + 1] === '{') {
          for (let j = i; j < pattern.length; j++) {
            temp += pattern[j]
            if (pattern[j] === '}') {
              i = j + 1
              break
            }
          }
          rs.push(temp)
        } else {
          rs.push('*{3}')
          i++
        }

      }
    }

    return rs
  }
  const ps = readPattern()
  for (const p of ps) {
    if (!check(p) || index >= s.length) {
      return false
    }
  }

  return true;
}
console.log(main("++++**{1}", "abcd333a"))