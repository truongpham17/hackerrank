/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  // [first, last]
  const arr = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      const first = i;
      while (s[i + 1] === '1') {
        i++
      }
      arr.push([first, i])
    }
  }
  if (arr.length === 0) return 0
  let prevFirst = arr[0][0]
  let prevLast = arr[0][1]
  let result = 0;
  for (let i = 1; i < arr.length; i++) {
    const pos = arr[i]
    result += prevLast - prevFirst + 1
    pos[0] = pos[0] - (prevLast - prevFirst + 1)
    prevFirst = pos[0]
    prevLast = pos[1]
  }
  if (arr[arr.length - 1][1] < s.length - 1) {
    result += prevLast - prevFirst + 1;
  }
  return result
};
console.log(maxOperations('10011010'))