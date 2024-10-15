/**
 * @param {number[]} maximumHeight
 * @return {number}
 */
var maximumTotalSum = function (maximumHeight) {
  maximumHeight.sort((a, b) => b - a)
  let sum = maximumHeight[0];
  let curMin = sum
  for (let i = 1; i < maximumHeight.length; i++) {
    curMin = Math.min(curMin - 1, maximumHeight[i])
    if(curMin <= 0) {
      return -1
    }
    sum += curMin 
  }
  return sum

};

console.log(maximumTotalSum([4,7,8,8,10]))