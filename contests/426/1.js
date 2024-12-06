/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function(n) {
  const b = n.toString(2);
  let rs = ''
  for(const c of b) {
    rs += '1'
  }  
  return parseInt(rs, 2)
};
console.log(smallestNumber(1))