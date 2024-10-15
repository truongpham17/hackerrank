/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  const map = new Map();
  const newArr = [...arr].sort((a, b) => a - b)
  let rank = 1;
  map.set(newArr[0], 1)
  for (let i = 1; i < newArr.length; i++) {
    if (newArr[i] !== newArr[i - 1]) {
      rank++
      map.set(newArr[i], rank)
    }
  }
  const rs = []
  for(const num of arr) {
    rs.push(map.get(num))
  }
  return rs
};