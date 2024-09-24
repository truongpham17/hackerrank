/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  const set = new Set()
  const rs = []
  for (const num of nums) {
    if (set.has(num)) {
      if (!rs.includes(num)) {
        rs.push(num)
      }
    } 
    set.add(num)
  }
  return rs
};