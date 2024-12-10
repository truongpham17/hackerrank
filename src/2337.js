/**
 * @param {string} start
 * @param {string} target
 * @return {boolean}
 */
var canChange = function (start, target) {
  const getNext = (str, pivot) => {
    while (str[pivot] === '_' && pivot < str.length) {
      pivot++
    }
    return pivot
  }

  let a = 0;
  let b = 0
  
  while (a < start.length || b < target.length) {
    a = getNext(start, a)
    b = getNext(target, b)
    if (start[a] !== target[b]) {
      return false
    }
    if (start[a] === 'L') {
      if (a < b) {
        return false
      }
    } else {
      if (a > b) {
        return false
      }
    }
    a++
    b++
  }
  return true
};
console.log(canChange('__', 'LL'))