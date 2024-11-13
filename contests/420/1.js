/**
 * @param {string} target
 * @return {string[]}
 */
var stringSequence = function (target) {
  const rs = []
  const build = (arr) => {
    const lastIndex = arr.length - 1
    if (lastIndex === target.length) return
    if (arr[lastIndex] === target[lastIndex]) {
      if (lastIndex < target.length-1) {
        arr.push('a')
        rs.push([...arr])
        build(arr)
      }
    } else {
      arr[lastIndex] = getNextChar(arr[lastIndex])
      rs.push([...arr])
      build(arr)
    }
  }
  rs.push(['a'])
  build(['a'])
  return rs.map(i => i.join(''))
};

function getNextChar(char) {
  const charCode = char.charCodeAt(0);

  if (char === 'z') {
    return 'a';
  } else if (char === 'Z') {
    return 'A';
  }

  return String.fromCharCode(charCode + 1);
}

console.log(stringSequence('he'))