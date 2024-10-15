/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  path = path.replace(/\/+/g, '/')
  const arr = path.split('/').filter(Boolean)
  const stack = []
  for (const item of arr) {
    if (item === '..') {
      stack.pop()
    } else if (item !== '.') {
      stack.push(item)
    }
  }
  if(stack.length === 0) return '/'
  return stack.reduce((sum, cur) => sum + '/' + cur, '')
};
console.log(simplifyPath('//'))
console.log(simplifyPath('/home/'))
console.log(simplifyPath('/home//foo/'))
console.log(simplifyPath('/home/user/Documents/../Pictures'))