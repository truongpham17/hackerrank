/**
 * @param {string} num
 * @return {boolean}
 */
var isBalanced = function (num) {
  const arr = num.split('').map(Number)
  let odd = 0;
  let even = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      even += arr[i]
    } else {
      odd += arr[i]
    }
  }
  return even === odd
};