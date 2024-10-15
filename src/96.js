/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const memo = new Map();
  memo.set(0,1)
  memo.set(1,1)
  memo.set(2,2)
  const count = (x) => {
    if(memo.has(x)) return memo.get(x) 
    let rs = 0
    for (let i = 0; i < x; i++) {
      // i element in left, x-i-1 in right
      rs += count(i) * count(x - i - 1)
    }
    memo.set(x, rs)
    return rs
  }
  return count(n)
};