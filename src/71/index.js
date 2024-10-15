/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const directories = []
  let temp = ''
  const push = (x) => {
    if (x === '.') return
    if (x === '..') { directories.pop(); return }
    directories.push(x)
  }
  for (const c of path) {
    if (c === '/') {
      if (temp.length > 0 && temp[0] !== '/') {
        push(temp)
      }
      temp = '/'
    } else {
      if (temp === '/') {
        temp = c
      } else {
        temp += c
      }
    }
  }
  if (temp !== '/') {
    push(temp)
  }
  if (directories.length === 0) return '/'
  return directories.reduce((sum, cur) => sum + '/' + cur, '')
};
console.log(simplifyPath('/home/'))
console.log(simplifyPath('/home//foo/'))
console.log(simplifyPath('/home/user/Documents/../Pictures'))